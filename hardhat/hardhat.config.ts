import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";

import * as dotenv from 'dotenv';
dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "localhost",
  networks: {
    localhost: {},
    goerli: {
      url: process.env.GOERLI_INFURA_URL,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};

export default config;
