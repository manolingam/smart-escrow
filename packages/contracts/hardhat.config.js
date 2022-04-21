require("hardhat/config");
require("dotenv").config();
require("@nomiclabs/hardhat-ganache");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-ethernal");
require("solidity-coverage");
require("./tasks/verify-blockscout");

const { INFURA_PROJECT_ID, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

/* eslint-disable no-undef, no-param-reassign */

extendEnvironment(hre => {
  hre.ethernalSync = true;
  hre.ethernalWorkspace = "WrappedInvoice";
});

module.exports = {
  solidity: {
    version: "0.8.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    artifacts: "./build",
  },
  networks: {
    sokol: {
      url: `https://sokol.poa.network`,
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 1000000000,
    },
    xdai: {
      url: `https://rpc.xdaichain.com`,
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 1000000000,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    ganache: {
      url: "http://127.0.0.1:8555",
      defaultBalanceEther: 1000,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
