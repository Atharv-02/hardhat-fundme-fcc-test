const { assert, expect } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");

describe("FundMe", function () {
  let fundMe, deployer, mockV3Aggregator;

  beforeEach(async function () {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    fundMe = await ethers.getContractAt("FundMe", deployer);
    mockV3Aggregator = await ethers.getContractAt("MockV3Aggregator", deployer);
  });

  describe("constructor", () => {
    it("Sets the aggregator Address", async () => {
      const response = await fundMe.getPriceFeed();
      assert.equal(response, await mockV3Aggregator.address);
    });
  });

  describe("Fund", function () {
    it("Fails if you don't send enough ETH ", async function () {
      const tx = await fundMe.fund();
      console.log(tx);
      await expect(fundMe.fund()).to.be.reverted;
    });
  });
});
