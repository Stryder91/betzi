const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await hre.ethers.getContractFactory("Token");
  const instance_token = await Token.deploy(5200 * 10^18);

  await instance_token.deployed();
  console.log("Instance_token deployed to:", instance_token.address);

  const Poolzi = await hre.ethers.getContractFactory("Poolzi");
  const instance_pool = await Poolzi.deploy('Bubble pool', instance_token.address);
  await instance_pool.deployed();
  console.log("instance_pool deployed to:", instance_pool.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
