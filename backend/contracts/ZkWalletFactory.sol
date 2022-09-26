//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import './ZkSocialRecoveryWallet.sol';

/// @title ZkWalletFactory
/// @author ZK Authentication team
/// @notice You can use this contract for deploying wallets having otp verification and social recovery
/// @dev All function calls are currently implemented without side effects
contract ZkWalletFactory {
  mapping(address => address) public userAddressToWalletAddress;
  event WalletCreated(address walletAddress);

  address public hashCheckVerifier;

  constructor(address _hashCheckVerifier) {
    hashCheckVerifier = _hashCheckVerifier;
  }

  /**
   * @notice Deploy a new wallet
   * @param _ownerPasswordHash password is not stored directly. We store the poseidon(public key user, password)
   * @param _thresholdForRecovery Minimum number of votes a new owner needs to get for execution
   * @param _otpVerifier address of the otp verifier contract
   * @param root merkle root value unique to a wallet which is later used in otp verification
   * @return walletAddress address of new wallet
   */
  function deployWallet(
    uint256 _ownerPasswordHash,
    uint256 _thresholdForRecovery,
    address _otpVerifier,
    uint256 _root
  ) external returns (address walletAddress) {
    ZkSocialRecoveryWallet wallet = new ZkSocialRecoveryWallet(
      hashCheckVerifier,
      _ownerPasswordHash,
      _thresholdForRecovery,
      _root,
      _otpVerifier
    );
    walletAddress = address(wallet);
    userAddressToWalletAddress[msg.sender] = walletAddress;

    emit WalletCreated(walletAddress);
  }

  /**
   * @notice Getter function to get user wallet address
   * @param _user address
   * @return walletAddress address of user wallet
   */
  function getUserWalletAddress(address _user)
    external
    view
    returns (address _walletAddress)
  {
    _walletAddress = userAddressToWalletAddress[_user];
  }
}
