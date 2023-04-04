// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TokenERC1155 is ERC1155, Ownable, ERC1155Burnable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC1155("") {}

    function mint(
        string memory _tokenURI,
        address account, 
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
         uint256 tokenId=_tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(account, tokenId, amount, data);
        _setURI(_tokenURI);
    }

    function getTokenIdCounter()public view returns(uint256){
        uint256 tokenId= _tokenIdCounter.current();
        return tokenId-1;  
    }
}

