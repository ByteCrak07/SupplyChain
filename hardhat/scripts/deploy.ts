import { ethers } from "hardhat";

async function main() {
  const supplyChainContractFactory = await ethers.getContractFactory(
    "SupplyChain"
  );

  console.log("Contract deployment starting...");
  const supplyChainContract = await supplyChainContractFactory.deploy();
  await supplyChainContract.deployed();

  console.log("Contract deployed to:", supplyChainContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
