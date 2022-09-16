pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract ZkValidator is Ownable {
    function verifyProof(
        uint256[2] memory passwordA,
        uint256[2][2] memory passwordB,
        uint256[2] memory passwordC,
        uint256[1] memory passwordInput
    ) public returns (bool) {
        require(
            Verifier.verifyHashCheckProof(
                passwordA,
                passwordB,
                passwordC,
                passwordInput
            ),
            "Password proof invalid!"
        );
    }

}
