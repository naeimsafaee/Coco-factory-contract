// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Coco is ERC721 {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    mapping(uint256 => string) private _tokenURIs;

    address private _manager;
    string private _collectionName;

    uint256 private _totalSupply;

    constructor(string memory name, string memory symbol, address manager) ERC721(name, symbol) {
        _manager = manager;
        _collectionName = name;
    }

    function mintNFT(string memory tokenURI) external payable returns (uint256) {
        require(msg.sender == _manager, "Only the manager can mint NFTs");
        require(msg.value == 0.001 ether, "Incorrect Ether amount");

        uint256 tokenId = _tokenId.current();
        _safeMint(msg.sender, tokenId);
        _tokenId.increment();
        _setTokenURI(tokenId, tokenURI);

        _totalSupply++;

        return tokenId;
    }

    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal {
        require(_exists(tokenId), "Invalid token ID");
        _tokenURIs[tokenId] = tokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Invalid token ID");
        return _tokenURIs[tokenId];
    }

    function getTokenMetadata(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Invalid token ID");
        return _tokenURIs[tokenId];
    }

    function getCollectionName() public view returns (string memory) {
        return _collectionName;
    }

    function owner() external view returns (address) {
        return _manager;
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

}
