//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
import './Verifiers/HashCheckVerifier.sol';
import './ZkOtpValidator.sol';
import 'hardhat/console.sol';

interface IHashCheckVerifier {
  function verifyProof(
    uint256[2] memory a,
    uint256[2][2] memory b,
    uint256[2] memory c,
    uint256[1] memory input
  ) external view returns (bool);
}

/// @title ZkSocialRecoveryWallet
/// @author ZK Authentication team
/// @notice You can use this contract for providing 2 factor authentication and social recovery
/// @dev All function calls are currently implemented without side effects
contract ZkSocialRecoveryWallet is IERC721Receiver, ZkOtpValidator {
  /// Address of hash check verifier
  address hashCheckVerifier;

  /// Address of owner
  address public owner;

  /// password is not stored directly. We store the poseidon(public key user, password)
  uint256 private ownerPasswordHash;

  /// Minimum number of votes a new owner needs to get for execution
  uint256 private thresholdForRecovery;

  /// Unique counter for recovery rounds
  uint256 public currentRecoveryNumber;

  /// Number of trustees(to retrieve in frontend)
  uint256 public numberTrustees;

  /// List of trustees
  address[] public Trustees;

  /// Map to find if an address is a trustee
  mapping(address => bool) Trustee;

  /// Map to store password hash corresponding to an address
  mapping(address => uint256) trusteeToPasswordHash;

  /// Map to store an owner and prevent trustees to use it again
  mapping(address => bool) pastOwners;

  /// Map to store if a proof is used
  mapping(uint256 => bool) usedProofs;

  /// Its true when recovery is in process
  bool public isRecoveryOn;

  /// Struct to store the variable required for the social recovery procedure
  struct RecoveryProcedure {
    uint256 numberOfVotesInSupport;
    address newOwnerProposed;
    bool isPassed;
    mapping(address => bool) trusteeSupporters;
  }

  /// Map to store the RecoveryProcedure for a recovery round number
  mapping(uint256 => RecoveryProcedure) recoveryRoundNumberToProcedure;

  event NewRecoveryProcedure(
    address indexed newProposedOwner,
    address indexed trusteeInitializer,
    uint256 currRecoveryRound
  );

  event VotedInRecovery(address indexed trustee, uint256 RecoveryRound);

  event RecoveryExecuted(
    address indexed oldOwner,
    address indexed newOwner,
    uint256 RecoveryRound
  );

  event RecoveryCancelled(address indexed Owner, uint256 RecoveryRound);

  modifier RecoveryShouldBeInProcess() {
    require(isRecoveryOn, 'Recovery has not started');
    _;
  }

  modifier RecoveryShouldNotBeInProcess() {
    require(!isRecoveryOn, 'Recovery is in process');
    _;
  }

  modifier isOwner() {
    require(owner == msg.sender, 'Not Owner');
    _;
  }

  modifier isTrustee() {
    require(Trustee[msg.sender], 'Not Trustee');
    _;
  }

  modifier verifyProofForTrustee(
    uint256[2] memory a,
    uint256[2][2] memory b,
    uint256[2] memory c,
    uint256[1] memory Input
  ) {
    require(
      IHashCheckVerifier(hashCheckVerifier).verifyProof(a, b, c, Input),
      'Password proof invalid!'
    );
    require(!usedProofs[a[0]], 'Proof is used');

    _;

    usedProofs[a[0]] = true;
  }

  constructor(
    address _hashCheckVerifier,
    uint256 _ownerPasswordHash,
    uint256 _thresholdForRecovery,
    uint256 _root,
    address _otpMerkleTreeVerifier
  ) ZkOtpValidator(_root, _otpMerkleTreeVerifier) {
    require(_hashCheckVerifier != address(0), 'Zero address verifier');

    hashCheckVerifier = _hashCheckVerifier;
    owner = msg.sender;
    ownerPasswordHash = _ownerPasswordHash;
    thresholdForRecovery = _thresholdForRecovery;
  }

  /**
   * @notice Set the trustees of a wallet after deployment
   * @param _trustees the list of trustee addresses
   */
  function setTrustees(address[] memory _trustees) external isOwner {
    for (uint256 i = 0; i < _trustees.length; i++) {
      require(!Trustee[_trustees[i]], 'Duplicate trustee in list');
      Trustee[_trustees[i]] = true;
    }
    Trustees = _trustees;
    numberTrustees = _trustees.length;
  }

  /**
   * @notice Set the trustees password's hash of a wallet after deployment
   * @param _passwordHashes the list of trustee password hashes
   */
  function setTrusteesPasswords(uint256[] memory _passwordHashes)
    external
    isOwner
  {
    require(
      Trustees.length == _passwordHashes.length,
      'Trustees and hashes length diff'
    );
    for (uint256 i = 0; i < Trustees.length; i++) {
      trusteeToPasswordHash[Trustees[i]] = _passwordHashes[i];
    }
  }

  /**
   * @notice Start the recovery process
   * @param a hash check proof from zk circuit
   * @param b hash check proof from zk circuit
   * @param c hash check proof from zk circuit
   * @param Input public signals containing the password hash
   * @param newOwner address of new owner
   */
  function startRecovery(
    uint256[2] memory a,
    uint256[2][2] memory b,
    uint256[2] memory c,
    uint256[1] memory Input,
    address newOwner
  )
    external
    isTrustee
    RecoveryShouldNotBeInProcess
    verifyProofForTrustee(a, b, c, Input)
    returns (uint256)
  {
    console.log('trustee hash', trusteeToPasswordHash[msg.sender]);
    console.log('Input', Input[0]);
    require(Input[0] == trusteeToPasswordHash[msg.sender], 'Wrong password');
    require(newOwner != address(0), 'Zero address');
    require(!pastOwners[newOwner], 'Owner should not be a past address');

    currentRecoveryNumber++;

    RecoveryProcedure storage recovery = recoveryRoundNumberToProcedure[
      currentRecoveryNumber
    ];
    recovery.newOwnerProposed = newOwner;
    recovery.numberOfVotesInSupport++;
    recovery.trusteeSupporters[msg.sender] = true;

    isRecoveryOn = true;
    emit NewRecoveryProcedure(newOwner, msg.sender, currentRecoveryNumber);

    return currentRecoveryNumber;
  }

  /**
   * @notice Vote in a recovery process already in process
   * @param a hash check proof from zk circuit
   * @param b hash check proof from zk circuit
   * @param c hash check proof from zk circuit
   * @param Input public signals containing the password hash
   * @param recoveryRoundNumber current recovery round going on
   */
  function voteInRecovery(
    uint256[2] memory a,
    uint256[2][2] memory b,
    uint256[2] memory c,
    uint256[1] memory Input,
    uint256 recoveryRoundNumber
  )
    external
    isTrustee
    RecoveryShouldBeInProcess
    verifyProofForTrustee(a, b, c, Input)
    returns (bool success)
  {
    require(Input[0] == trusteeToPasswordHash[msg.sender], 'Wrong password');
    console.log('Here1');
    require(
      recoveryRoundNumber <= currentRecoveryNumber,
      'Wrong Recovery round number'
    );
    console.log('Here');
    RecoveryProcedure storage recovery = recoveryRoundNumberToProcedure[
      recoveryRoundNumber
    ];
    require(!recovery.trusteeSupporters[msg.sender], 'Trustee already voted');
    recovery.numberOfVotesInSupport++;
    recovery.trusteeSupporters[msg.sender] = true;

    success = true;

    emit VotedInRecovery(msg.sender, recoveryRoundNumber);
  }

  /**
   * @notice Execute and finish the recovery process
   * @param a hash check proof from zk circuit
   * @param b hash check proof from zk circuit
   * @param c hash check proof from zk circuit
   * @param Input public signals containing the password hash
   * @param recoveryRoundNumber current recovery round going on
   */
  function executeRecoveryChange(
    uint256[2] memory a,
    uint256[2][2] memory b,
    uint256[2] memory c,
    uint256[1] memory Input,
    uint256 recoveryRoundNumber
  )
    external
    isTrustee
    RecoveryShouldBeInProcess
    verifyProofForTrustee(a, b, c, Input)
  {
    require(Input[0] == trusteeToPasswordHash[msg.sender], 'Wrong password');
    RecoveryProcedure storage recovery = recoveryRoundNumberToProcedure[
      recoveryRoundNumber
    ];

    require(
      recovery.numberOfVotesInSupport >= thresholdForRecovery,
      'Votes Not enough'
    );

    recovery.isPassed = true;
    isRecoveryOn = false;
    address old = owner;
    owner = recovery.newOwnerProposed;
    pastOwners[owner] = true;

    emit RecoveryExecuted(old, owner, recoveryRoundNumber);
  }

  /**
   * @notice Vote in a recovery process already in process
   * @param a hash check proof from zk circuit
   * @param b hash check proof from zk circuit
   * @param c hash check proof from zk circuit
   * @param Input public signals containing the password hash
   * @param recoveryRoundNumber current recovery round going on
   */
  function cancelRecovery(
    uint256[2] memory a,
    uint256[2][2] memory b,
    uint256[2] memory c,
    uint256[1] memory Input,
    uint256 recoveryRoundNumber
  )
    external
    isOwner
    RecoveryShouldBeInProcess
    verifyProofForTrustee(a, b, c, Input)
  {
    require(Input[0] == ownerPasswordHash, 'Wrong password');
    isRecoveryOn = false;
    emit RecoveryCancelled(owner, recoveryRoundNumber);
  }

  /**
   * @notice Execute a transaction after OTP verification
   * @param a OTP verification proof from zk circuit
   * @param b OTP verification proof from zk circuit
   * @param c OTP verification proof from zk circuit
   * @param Input public signals containing the Merkle root and time
   * @param recoveryRoundNumber current recovery round going on
   */
  function executeTxn(
    uint256[2] memory a,
    uint256[2][2] memory b,
    uint256[2] memory c,
    uint256[2] memory input,
    address callee,
    uint256 value
  ) external isOwner returns (bytes memory result) {
    require(verifyOTP(a, b, c, input), 'Proof failed');
    (bool success, bytes memory result) = callee.call{value: value}('');
    require(success, 'external call reverted');
    // emit TransactionExecuted(callee, value, data);
    return result;
  }

  function onERC721Received(
    address,
    address,
    uint256,
    bytes memory
  ) public pure override returns (bytes4) {
    return this.onERC721Received.selector;
  }

  /**
   * @notice recieve funds
   */
  receive() external payable {}
}