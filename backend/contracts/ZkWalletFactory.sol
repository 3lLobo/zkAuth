//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import './ZkSocialRecoveryWallet.sol';

contract ZkWalletFactory {
  mapping(address => address) public userAddressToWalletAddress;
  event WalletCreated(address walletAddress);

  address public hashCheckVerifier;

  constructor(address _hashCheckVerifier) {
    hashCheckVerifier = _hashCheckVerifier;
  }

  function deployWallet(
    uint256 _ownerPasswordHash,
    address[] memory _trustees,
    uint256[] memory _passwordHashes,
    uint256 _thresholdForRecovery,
    address _otpVerifier,
    uint256 _root
    
  ) external returns (address walletAddress) {
    ZkSocialRecoveryWallet wallet = new ZkSocialRecoveryWallet(
      hashCheckVerifier,
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
