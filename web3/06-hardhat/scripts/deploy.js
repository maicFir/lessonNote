const hre = require("hardhat");

async function main() {
  const add = await hre.ethers.deployContract("Add");
  await add.waitForDeployment();
  console.log(`Add deployed to ${add.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
