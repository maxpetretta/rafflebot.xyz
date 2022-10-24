# rafflebot.xyz
This repo contains the source code for [rafflebot.xyz](https://rafflebot.xyz), a smart contract based daily raffle platform.  Rafflebot is secured by [WorldID](https://id.worldcoin.org), which ensures that participants can only enter each raffle once.  Deployed to the [Goerli testnet](https://goerli.etherscan.io/address/0x411A84893aEd4fD5495e210A9f11FA009757fb98).

[![A screenshot of rafflebot.xyz](./public/site.png)](https://rafflebot.xyz)

## Tech Stack
Built with the following technologies:

* [WorldID](https://id.worldcoin.org): Privacy preserving, proof-of-personhood protocol
* [Hardhat](https://hardhat.org/): Smart contract development and testing
* [wagmi.sh](https://wagmi.sh/): React hooks for Ethereum
* [ConnectKit](https://docs.family.co/connectkit): React components for connecting wallets
* [Next.js](https://nextjs.org/): Static site builds and routing
* [Tailwind](https://tailwindcss.com/): Adaptive CSS page styling
* [Vercel](https://vercel.com/): Web hosting and automatic deployments

### TODOs
Rafflebot is currently in MVP stage.  There are a number of features to be added before the app could be considered complete:
1. Fully integrate with WorldID at the smart contract level.  The current implementation could be gamed by a malicious user, which would violate the one-person, one-entry rule
2. Morph the smart contract into a NFT dispenser, giving the raffle winner a token for their prize
    - It might also be worth considering an integration with [POAP](https://poap.xyz/), in lieu of custom NFTs
3. Notify winners using [Push Protocol](https://push.org/), in case they are not chain-savvy
4. Make the raffle reusable and user-contributable, allowing users to add their own tokens/NFTs/etc. to a shared pot
5. Add a full suite of tests covering all smart contract functions

## Installation

### Prereqs
To build your own copy of rafflebot, you will first need:
* [Infura API key(s)](https://infura.io/) for your chosen networks
* [Etherscan API key](https://etherscan.io/apis) for contract verification
* Deployer wallet private key with some [(test) ETH](https://faucet.paradigm.xyz/)

Clone the repo locally with the following commands:
```
git clone https://github.com/maxpetretta/rafflebot.xyz
cd rafflebot.xyz/hardhat
npm install
```

Place all of the above secrets in the [.env file](./hardhat/.env.example)

### Smart Contract
You can deploy the contract with the included script file, use these commands:
```
npx hardhat run scripts/deploy.js --network <NETWORK_NAME>
npx hardhat verify --network <NETWORK_NAME> <CONTRACT_ADDRESS>
```

If running locally, you may skip the `verify` step.  A local testnet can be started with `npx hardhat node`.

### Frontend
The website UI needs the contract to exist before it will function correctly.  After you've completed the above, you should update the contract details in [contract.ts](./react/lib/contract.ts).  Make sure the address and [ABI](./react/lib/abi/Rafflebot.json) are in-sync with the live deployment.  To start the frontend, run:
```
cd ../react
npm install
npm run dev
open http://localhost:3000
```

## Tests
As mentioned above, Rafflebot is currently a MVP.  Basic scaffolding for contract tests can be found in [tests.ts](./hardhat/test/tests.ts).  Before a mainnet deployment, a comprehensive suite of tests should be written.

Running tests is done by:
```
cd ./hardhat
npx hardhat test
```
