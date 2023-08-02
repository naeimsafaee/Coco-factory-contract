require('dotenv').config();
const { ethers } = require("ethers");
const contractABI = require("../artifacts/contracts/MindMintNft.sol/MindMintNft.json").abi;

describe("MindMintNft", () => {
    let provider;
    let managerWallet;
    let userWallet;
    let contract;

    beforeAll(async () => {

       /* provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC);
        managerWallet = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);

        // userWallet = new ethers.Wallet(privateKey, provider);

        const contractAddress = process.env.NFT_CONTRACT_SEPOLIA;
        contract = new ethers.Contract(contractAddress, contractABI, managerWallet);*/
    });

    describe("mint", () => {
        it("should mint a new NFT", async () => {

        } , 5000);

    });

});

