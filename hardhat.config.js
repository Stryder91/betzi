require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.RINK_API}`,
      accounts: [`${PRIVATE_KEY}`]
    },
    // mumbai: {
    //   url: `https://polygon-mumbai.infura.io/v3/${PROJECT_ID}`,
    //   accounts: [PRIVATE_KEY]
    // },
    // mainnet: {
    //   url: `https://polygon-mumbai.infura.io/v3/${PROJECT_ID}`,
    // }
},
};
