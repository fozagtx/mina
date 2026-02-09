import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying MemecoinFactory with account:", deployer.address);

  const Factory = await ethers.getContractFactory("MemecoinFactory");
  const factory = await Factory.deploy();
  await factory.waitForDeployment();

  const address = await factory.getAddress();
  console.log("MemecoinFactory deployed to:", address);
  console.log("Add this to your .env as FACTORY_ADDRESS=" + address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
