//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import './ZkSocialRecoveryWallet.sol';

contract ZkWalletFactory {
  mapping(address => address) userAddressToWalletAddress;
  event WalletCreated(address walletAddress);

  constructor() {}

  function deployWallet(
    address _hashCheckVerifier,
    uint256 _ownerPasswordHash,
    address[] memory _trustees,
    uint256[] memory _passwordHashes,
    uint256 _thresholdForRecovery,
    
    uint256 _root,
    address _otpVerifier
  ) external returns (address walletAddress) {
    ZkSocialRecoveryWallet wallet = new ZkSocialRecoveryWallet(
      _hashCheckVerifier,
      _ownerPasswordHash,
      _trustees,
      _passwordHashes,
      _thresholdForRecovery,
      _root,
      _otpVerifier
    );
    walletAddress = address(wallet);
    userAddressToWalletAddress[msg.sender] = walletAddress;

    emit WalletCreated(walletAddress);
  }

  function getUserWalletAddress(address _user) external view returns(address _walletAddress) {
    _walletAddress = userAddressToWalletAddress[_user];
  }
}
