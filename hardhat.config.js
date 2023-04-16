require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork:"hardhat",
  networks: {
    buildbear: {
      url: "https://rpc.dev.buildbear.io/repulsive-lobot-9d485d69",
    }
  }
};
