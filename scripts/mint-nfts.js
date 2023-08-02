require('dotenv').config();
const { ethers } = require("ethers");

// CocoFactory and Coco contract ABI and bytecode
const cocoFactoryABI = require("../artifacts/contracts/CocoFactory.sol/CocoFactory.json").abi;
const cocoFactoryBytecode = require("../artifacts/contracts/CocoFactory.sol/CocoFactory.json").bytecode;
const cocoABI = require("../artifacts/contracts/Coco.sol/Coco.json").abi;
const cocoBytecode = require("../artifacts/contracts/Coco.sol/Coco.json").bytecode;
const fs = require("fs");


async function main() {
    // Create an ethers.js provider
    const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC);

    // Replace with your Ethereum wallet private key
    const privateKey = `0x${process.env.PRIVATE_KEY}`;
    const wallet = new ethers.Wallet(privateKey, provider);

    console.log("address:", wallet.address);

    // Deploy the Coco contract
   /* const cocoFactoryFactory = new ethers.ContractFactory(cocoFactoryABI, cocoFactoryBytecode, wallet);
    const cocoFactoryContract = await cocoFactoryFactory.deploy();
    console.log("CocoFactory contract deployed to:", cocoFactoryContract.address);
*/

    const cocoFactoryContract = new ethers.Contract(process.env.NFT_FACTORY, cocoFactoryABI, wallet);

    // Save the contract address and ABI to a file for future use
   /* fs.writeFileSync("cocoFactoryAddress.json", JSON.stringify({ address: cocoFactoryContract.address }));
    fs.writeFileSync("cocoFactoryABI.json", JSON.stringify(cocoFactoryABI));
*/

    // Deploy the Coco contract
    const cocoFactoryInstance = new ethers.Contract(cocoFactoryContract.address, cocoFactoryABI, wallet);
    const createCollectionTx = await cocoFactoryInstance.createCollection("Test1", "B");
    const txReceipt = await createCollectionTx.wait();
    const collectionAddress = txReceipt.events[0].args.collectionAddress;

    console.log("Collection created with address:", collectionAddress);

    console.log("Collection created.");
    console.log({createCollectionTx});

    // Mint NFTs into the new collection
    const newCollectionAddress = collectionAddress;
    // const newCollectionAddress = await cocoFactoryInstance.collections(2);
    const cocoInstance = new ethers.Contract(newCollectionAddress, cocoABI, wallet);

    const numNFTsToMint = 5;

    for (let i = 0; i < numNFTsToMint; i++) {
        const tokenURI = `https://example.com/metadata/${i}`;

        const mintNFTTx = await cocoInstance.mintNFT(tokenURI, { value: ethers.utils.parseEther("0.001") });
        await mintNFTTx.wait();

        console.log(`NFT ${i + 1} minted with token URI:`, tokenURI);
    }
}

main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});
