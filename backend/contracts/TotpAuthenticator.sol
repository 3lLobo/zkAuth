// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


struct AuthData {
    // fist five digits of the 6-digit totp code tail-padded with a zero and finally parsed to a single number
    uint32 totp5;
    // Teh sha256 hash of the complete code parsed to a single number.
    uint256 totp6hash;
    // time-stamp of TOTP code creation.
    uint256 time;
}

struct AuthResponse {
    // Has it already been validated. Defaults to false
    bool isValidated;
    AuthData response;
}

struct Authentication {
    bool isValid;
    uint256 time;
    address authenticatedAddress;
}

contract TotpAuthenticator is Ownable {
    // Counter provides requestId and increments with each request
    uint256 requestCounter = 0;
    // Maps a requestId to the requestor/validator and to the auth requested address
    mapping(uint256 => address[2]) requests;
    // Maps a requestId to a address and its response.
    mapping(uint256 => mapping(address => AuthResponse)) responses;
    

    // Maps requestId to completes authentication
    mapping(uint256 => Authentication) completedAuth;

    // TODO: define Events

    function setRequest(address _authAddress) public {
        // TODO: emit Event
        requests[requestCounter] = [msg.sender, _authAddress];
        requestCounter++;

    }

    function setResponse(uint256 _requestId, AuthData calldata _authData)
        public
    {
        // TODO: get list of keys from response
        // loop over keys and check that the sender has not submitted a response to this request yet
        // or just override it:
        responses[_requestId][msg.sender] = _authData;
        
        // TODO: emit Event

    }

    function getResponses(uint256 _requestId) public view returns (AuthData memory) {
        // Assert that caller created the AuthRequest
        require(isValidator(_requestId), "This address did not submit the request.");
        // Don't think it's allowed to return a mapping
        return responses[_requestId];
    }

    // @param _requestId the id of the request
    // @_responseAddress the address which submitted the valid response
    function authenticate(uint32 _lastDigit, address _responseAddress) public {
        // Assert that caller created the AuthRequest
        require(isValidator(_requestId), "This address did not submit the request.");
        // TODO: 
        // multiply totp5 by 10 and add _lastDigit,
        // Cumpute sha256 hash and check agains stored hash
        // TODO: emit Event

    }

    function getAuthentication(uint256 _requestId) public view returns (Authentication) {
        return completedAuth[_requestId];
    }

    function resetAuthenticator() public onlyOwner {
        // TODO: emit Event
        // TODO: delete everything
    }

    function isValidator(uint256 _requestId) private returns (bool) {
        return msg.sender = requests[_requestId][0];
    }

    function checkHash(uint32 _totp5, uint32 _lastDigit, ) private returns (bool) {
        // TODO: the hashing check
        // What type is sha256
    }
}
