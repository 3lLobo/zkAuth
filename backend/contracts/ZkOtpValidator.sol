pragma solidity^0.8.9;

import "hardhat/console.sol";

interface IOtpMerkleTreeVerifier {
    function verifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) external view returns (bool);
}


contract ZkOtpValidator{

    uint256 immutable root;

    address immutable verifier;

    uint256 lastValidatedTimestamp;

    constructor(uint256 _root, address _verifier){
        root = _root;
        verifier = _verifier;
    }

    // modifier verify(
    //     uint256[2] memory a,
    //     uint256[2][2] memory b,
    //     uint256[2] memory c,
    //     uint256[2] memory input
    // ) {
    //     require(input[0] == root, "Incoorect root");
    //     require(input[1] > lastValidatedTimestamp, "Old Proof");
    //     require(IOtpMerkleTreeVerifier(verifier).verifyProof(a, b, c, input), "Invalid proof");
    //     _;
    //     lastValidatedTimestamp = input[1];
    // }

    function verifyOTP(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public returns(bool success){
        require(input[0] == root, "Incoorect root");
        require(input[1] > lastValidatedTimestamp, "Old Proof");
        require(IOtpMerkleTreeVerifier(verifier).verifyProof(a, b, c, input), "Invalid proof");
        lastValidatedTimestamp = input[1];
        success = true;
    }

}