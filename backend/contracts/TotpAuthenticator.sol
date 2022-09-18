// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import 'hardhat/console.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

struct AuthData {
  // fist five digits of the 6-digit totp code tail-padded with a zero and finally parsed to a single number
  uint256 totp5;
  // Teh sha256 hash of the complete code parsed to a single number.
  bytes32 totp6hash;
  // time-stamp of TOTP code creation.
  uint256 time;
}

struct Authentication {
  bool isValid;
  uint256 time;
  address authenticatedAddress;
}

contract TotpAuthenticator is Ownable {
  // Counter provides requestId and increments with each request
  uint256 public requestCounter;
  // Maps a requestId to the requestor/validator and to the auth requested address
  mapping(uint256 => address[2]) public requests;
  // Maps a requestId to a address and its response.
  mapping(uint256 => mapping(address => AuthData)) public responses;
  // Maps requestId to completes authentication
  // TODO: make this private and create a function to get this value, which initially checks if the requested Id is below the current counter. Otherwise collisions can happen after reset.
  mapping(uint256 => Authentication) public completedAuth;

  // Events to index with theGraph in order to notify both parties
  event EventAuthRequest(address requestor, address target, uint256 requestId);
  event EventAuthResponse(
    address responder,
    uint256 requestId,
    AuthData response
  );
  event EventAuthValid(uint256 requestId, Authentication authentication);
  event EventResetContract(uint256 time);

  // Create a request for a wallet to authenticate.
  function setRequest(address _target) public {
    uint256 _currentCount = requestCounter;
    requests[_currentCount] = [msg.sender, _target];
    requestCounter++;

    emit EventAuthRequest(msg.sender, _target, _currentCount);
  }

  // Submit a repsonse to an authentication request
  function setResponse(
    uint256 _requestId,
    uint256 _totp5,
    bytes32 _totp6hash,
    uint256 _time
  ) public {
    // require reqId lover than count
    require(_requestId < requestCounter, 'ResuestId too high');
    require(completedAuth[_requestId].time == 0, 'Request already authorized');
    require(
      responses[_requestId][msg.sender].totp5 == 0,
      'Response already submitted'
    );
    AuthData memory _authData = AuthData(_totp5, _totp6hash, _time);
    responses[_requestId][msg.sender] = _authData;

    emit EventAuthResponse(msg.sender, _requestId, _authData);
  }

  // // The Requestor can get the repsonse data. Preferably though the event indexer graph
  // function getResponses(uint256 _requestId, address _responder)
  //   public
  //   view
  //   returns (AuthData memory)
  // {
  //   // Assert that caller created the AuthRequest
  //   require(isValidator(_requestId), 'U did not submit this request');
  //   // Don't think it's allowed to return a mapping
  //   return responses[_requestId][_responder];
  // }

  // @param _requestId the id of the request
  // @_responseAddress the address which submitted the valid response
  function authenticate(
    uint256 _requestId,
    uint256 _lastDigit,
    address _responseAddress
  ) public {
    // Assert that caller created the AuthRequest
    require(isValidator(_requestId), 'Validation only by requestor');
    require(
      responses[_requestId][_responseAddress].time > 0,
      'No auth response from this wallet'
    );

    AuthData memory _authData = responses[_requestId][_responseAddress];
    bool _isValid = checkHash(_authData.totp5, _lastDigit, _authData.totp6hash);
    require(_isValid, 'On-chain validation failed');

    Authentication memory authentication = Authentication(
      _isValid,
      block.timestamp,
      _responseAddress
    );
    completedAuth[_requestId] = authentication;

    emit EventAuthValid(_requestId, authentication);
  }

  // Returns the authentication details for a completed requestId
  function getAuthentication(uint256 _requestId)
    public
    view
    returns (Authentication memory)
  {
    return completedAuth[_requestId];
  }

  // Reset the contract by deleting all data
  function resetAuthenticator() public onlyOwner {
    requestCounter = 0;
    // TODO: create zero AuthResponse and set the responses[_requestId] = zeroAuthResponse each time a request is initalized.
    // How do we empty the mappings?
    emit EventResetContract(block.timestamp);
  }

  // Check if the sender also submitted the request
  function isValidator(uint256 _requestId) private view returns (bool) {
    return msg.sender == requests[_requestId][0];
  }

  function toBytes(uint256 x) private pure returns (bytes memory b) {
    b = new bytes(32);
    assembly {
      mstore(add(b, 32), x)
    }
  }

  // Multiply the 5 didgit response by 10 (smiliar to padding with zero) and add the 6st digit. Then compare the hashes.
  function checkHash(
    uint256 _totp5,
    uint256 _lastDigit,
    bytes32 _totp6hash
  ) private pure returns (bool) {
    uint256 _totp6 = _totp5 * 10 + _lastDigit;

    // console.log('number totp6');
    // console.log(_totp6);
    // bytes memory bytestotp6 = toBytes(_totp6);

    // console.log('bytes of totp6');
    // console.logBytes(bytestotp6);

    // bytes32 shatotp6 = sha256(toBytes(_totp6));
    // console.log('Sha shatotp6');
    // console.logBytes32(shatotp6);
    // console.log('original  _totp6hash');
    // console.logBytes32(_totp6hash);

    return sha256(toBytes(_totp6)) == _totp6hash;
  }
}