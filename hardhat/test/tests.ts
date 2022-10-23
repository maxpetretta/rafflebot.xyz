/**
 * Run a series of tests on the smart contract locally
 */
const { expect } = require("chai")
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers")

describe("Rafflebot contract", function () {
  async function rafflebotFixture() {
    const accounts = await hre.ethers.getSigners()
    const owner = accounts[0]
    const contract = await hre.ethers.getContractFactory("Rafflebot")

    const rafflebot = await contract.deploy()
    await rafflebot.deployed()

    return { rafflebot, owner, accounts }
  }

  describe("Deployment", function () {
    it("Should set the initial raffle ID to zero", async function () {
      const { rafflebot } = await loadFixture(rafflebotFixture)
      expect(await rafflebot.getID()).to.equal(0)
    })
  })

  // TODO: More tests needed before a mainnet deployment, skipping for now
})
