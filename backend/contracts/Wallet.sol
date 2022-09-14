// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "./WalletFactory.sol";

contract Wallet is Context{
    
    event TransferETH(address indexed amount, uint amount);

    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);

    address public factory;

    address private _owner;

    uint identityTokenId;

    uint currRequestId;

    struct Request{
        uint requestId;
        string name;
    }

    modifier onlyOwner() {
        require(owner() == _msgSender(),"Wallet::onlyOwner");
        _;
    }

    constructor(address newOwner, uint _identityTokenId){
        factory = _msgSender();
        _changeOwner(newOwner);
        identityTokenId = _identityTokenId;
    }

    function _changeOwner(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

}