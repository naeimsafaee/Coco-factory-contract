// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the ERC721 interface and SafeMath library if needed
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./Coco.sol";

contract CocoFactory {
    using SafeMath for uint256;


    // Event to track the creation of a new collection
    event CollectionCreated(address indexed collectionAddress, string name);

    // Array to store the addresses of deployed collections
    address[] public collections;

    // Mapping to track the name of each collection contract
    mapping(address => string) public collectionNames;

    constructor(){
    }

    // Function to create a new collection of ERC721 NFTs
    function createCollection(string memory name, string memory symbol) external returns (address) {
        // Deploy a new ERC721 contract with the provided name and symbol
        Coco collection = new Coco(name, symbol , msg.sender);

        // Save the address of the deployed collection contract
        address collectionAddress = address(collection);

        // Add the collection address to the collections array
        collections.push(collectionAddress);

        // Map the name of the collection to its contract address
        collectionNames[collectionAddress] = name;

        // Emit an event to notify that a new collection has been created
        emit CollectionCreated(collectionAddress, name);

        return collectionAddress;
    }

    function getCollectionCount() external view returns (uint256) {
        return collections.length;
    }

    function getCollectionsByAddress(address owner) external view returns (address[] memory) {
        uint256 collectionCount = collections.length;
        address[] memory ownedCollections = new address[](collectionCount);
        uint256 ownedCount = 0;

        for (uint256 i = 0; i < collectionCount; i++) {
            address collectionAddress = collections[i];
            Coco collection = Coco(collectionAddress);

            if (collection.owner() == owner) {
                ownedCollections[ownedCount] = collectionAddress;
                ownedCount++;
            }
        }

        // Resize the array to remove any empty slots
        assembly {
            mstore(ownedCollections, ownedCount)
        }

        return ownedCollections;
    }

}
