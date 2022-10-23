/**
 * Deploy the smart contract to the specified network
 */
const hre = require("hardhat")

const main = async () => {
  const [owner] = await hre.ethers.getSigners()
  const balance = await owner.getBalance()
  const network = hre.network.name

  console.log("Selected network:", network)
  console.log("Deploying contract with account:", owner.address)
  console.log("Account balance:", hre.ethers.utils.formatEther(balance))

  console.log("\nDeploying in 10 seconds...")
  await sleep(10000)

  const contract = await hre.ethers.getContractFactory("Rafflebot")
  const txn = await contract.deploy()

  await txn.deployed()
  console.log("\nContract address:", txn.address)
}

/**
 * Sleep the main thread for the specified number of milliseconds
 * @param {number} ms
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Execute the main script
 */
const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

runMain()
