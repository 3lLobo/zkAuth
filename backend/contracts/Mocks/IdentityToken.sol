// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract IdentityToken is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Identity", "IDENTITY"){}

    function mint(address user, string memory _tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(user, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        _tokenIds.increment();
        return newItemId;
    }

    function burn(uint256 tokenId)
    public{
        _burn(tokenId);
    }

}