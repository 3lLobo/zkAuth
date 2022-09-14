// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct Totp5 {
    uint32 firstFive;
}

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
    mapping(uint256 => mapping(address => address)) requests;
    mapping(uint256 => mapping(address => AuthResponse)) responses;
    uint256[] requestIds;

    // TODO: define Events

    function setRequest(address _authAddress) public {
        // TODO: emit Event
    }

    function setResponse(uint256 _requestId, AuthData calldata _authData)
        public
    {
        // TODO: emit Event
    }

    function getResponse() public view returns (AuthData memory) {
        // Assert that caller created the AuthRequest
    }

    function authenticate() public {
        // Assert that caller created the AuthRequest
        // TODO: emit Event
    }

    function getAuthentication() public view returns (bool) {}

    function resetAuthenticator() public onlyOwner {
        // TODO: emit Event
    }

    function checkHash() private returns (bool) {}
}
