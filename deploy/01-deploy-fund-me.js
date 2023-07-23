const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { network } = require("hardhat");
module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  // const ethUsdPriceFeedAddress =
  // networkConfig[chainId]["ethUsdPriceFeedAddress"];

  let ethUsdPriceFeedAddress;

  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");

    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeedAddress"];
  }
  //Mock contracts - If the contract cant be locally tested, we use a miniml version of it for loal testing
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress], //Pass in the constructor arguments(price feed address in this case )
    log: true,
    waitConfirmations: network.config.blockConfirmations,
  });

  log("-------------------------------------------");
};
module.exports.tags = ["all", "fundMe"];
