const HDWalletProvider = require("truffle-hdwallet-provider");

//dotenv should not be used in Production
//Instead, the environment variables should be set manually on the host machine
//Environment variables for dotenv are stored in the ".env" file in this directory

require('dotenv').load();  // Store environment-specific variable from '.env' to process.env

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // matching any idm,
      gas: 1000000,
      gasPrice: 10000000000
    },
    ropsten: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 3,
      gas: 3000000,
      gasPrice: 21
    }
  }
}