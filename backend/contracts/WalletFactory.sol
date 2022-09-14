// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "./Wallet.sol";
import "./Mocks/IdentityToken.sol";

contract WalletFactory is Context {
    mapping(address => address) userToWalletAddress;

    IdentityToken idToken;

    event NewWalletCreated(address indexed owner, address indexed walletAddress, uint identityTokenId);

    constructor() {
        idToken = new IdentityToken();
        idToken.mint(address(this), "Genesis Token");
    }

    function createNewWallet() external returns (bool success) {
        require(
            userToWalletAddress[_msgSender()] == address(0),
            "WalletFactory::createUserWallet: user already present"
        );

        uint tokenId = idToken.mint(_msgSender(), "");

        Wallet wallet = new Wallet(_msgSender(), tokenId);

        userToWalletAddress[_msgSender()] = address(wallet);

        emit NewWalletCreated(_msgSender(), address(wallet), tokenId);
    }

    
}
