const { assert } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");

describe("FundMe", function () {
  let fundMe, deployer, mockV3Aggregator;

  beforeEach(async function () {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    fundMe = await ethers.getContractAt("FundMe", deployer);
    mockV3Aggregator = await ethers.getContractAt("MockV3Aggregator", deployer);
  });

  describe("constructor", function () {
    it("sets the aggregator addresses correctly", async () => {
      const address = await mockV3Aggregator.getAddress();
      const response = await fundMe.getPriceFeed();
      console.log(response);
      assert.equal(response, address);
    });
  });
});
