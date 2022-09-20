pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./HashCheckVerifier.sol";
import "hardhat/console.sol";

contract ZkValidator is Ownable {

    Verifier verifier;

    constructor(){
        verifier = new Verifier();
    }

    function verifyProofForUserWallet(
        uint256[2] memory passwordA,
        uint256[2][2] memory passwordB,
        uint256[2] memory passwordC,
        uint256[1] memory passwordInput
    ) public view returns (bool success) {
        require(
            verifier.verifyProof(
                passwordA,
                passwordB,
                passwordC,
                passwordInput
            ),
            "Password proof invalid!"
        );

        success = true;
    }
}
