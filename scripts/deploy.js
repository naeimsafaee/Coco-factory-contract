require('dotenv').config();
const {ethers} = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Start deploying with balance: ", balance.toString());

    console.log("Deploying NFTFactory contract with the account: ", deployer.address);

    const NFTFactory = await ethers.getContractFactory("CocoFactory");
    const nftFactory = await NFTFactory.deploy();

    console.log("NFTFactory contract deployed to:", nftFactory.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error deploying contract:", error);
        process.exit(1);
    });
