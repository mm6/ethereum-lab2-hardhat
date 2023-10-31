##  Fall 2023 Blockchain and SQL Fundamentals
### Carnegie Mellon University MSCF
### Due: Wednesday, November 22, 2023 11:59 PM
### 10 Points
### Deliverable: A single .pdf file named Lab2.pdf with clearly labelled answers.

**Learning Objectives:**

The deliverable is a single well labelled pdf file with answers for E.1. through E.11.

## Part 1. Writing a client side program
```
npm init     hit return and take the defaults provided
npm install --save-dev hardhat
npx hardhat init     select create an empty hardhat config
npm install --save-dev @nomicfoundation/hardhat-toolbox
At top of config.js put require("@nomicfoundation/hardhat-toolbox");
npx hardhat node

In the scripts directory: store ListBalances.js

// Display account addresses and ether balances
async function getAddressesAndBalances() {
  const signers = await ethers.getSigners();
  const provider = ethers.provider;

  for (const signer of signers) {
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);

    console.log("Account address:", address);
    console.log("Account balance:", balance);
  }
}

// Call getAddressesAndBalances
getAddressesAndBalances()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }
);

npx hardhat run scripts/ListBalances.js --network localhost
```
