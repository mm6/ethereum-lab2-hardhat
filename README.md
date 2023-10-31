##  Fall 2023 Blockchain and SQL Fundamentals
### Carnegie Mellon University MSCF
### Due: Wednesday, November 22, 2023 11:59 PM
### 10 Points
### Deliverable: A single .pdf file named Lab2.pdf with clearly labelled answers.

**Learning Objectives:**

In Part 1, we will work without a smart contract. We will start the Hardhat
network in its own shell and interact with the shell via a Javascript program.

## Part 1. Writing a client side program to interact with a Hardhat network running locally in its own shell.

1. In an empty directory named Lab2_Part1, begin by setting up an npm package. Hit return and select the defaults.
```
npm init     
```
2. We will use Hardhat for development.

```
npm install --save-dev hardhat
```
3. Create an empty Hardhat configuration.
```
npx hardhat init     
```
4. We will develop using the Hardhat plugins from the nomic foundation.
```
npm install --save-dev @nomicfoundation/hardhat-toolbox
```
5. We need to refer to these tools in the config.js file. At top of config.js, put the following line:
```
require("@nomicfoundation/hardhat-toolbox");
```
6. Start a JSON-RPC server on top of the Hardhat Ethereum Virtual Machine. This
server is available at https://127.0.0.1:8545.
```
npx hardhat node
```
7. Leave this server running in its own shell. Open a new shell and change to the directory Lab2_Part1. Within that shell, create a new subdirectory named scripts.
```
mkdir scripts
```

8. Within the scripts directory, store the following file under the name "ListAndTransferBalances.js".

```
// ListAndTransferBalances.js
// Define a function to display account addresses and ether balances
async function getAddressesAndBalances() {
  // Get signers (accounts with private keys)
  const signers = await ethers.getSigners();
  const provider = ethers.provider;
  // Visit each signer
  for (const signer of signers) {
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    // Display address and balance
    console.log("Account address:", address);
    console.log("Account balance:", balance);
  }
}
// Define a function to perform a transfer
async function performTransfer() {
  const [Alice,Bob,Carol] = await ethers.getSigners();
  // Transfer 1 Eth from Alice to Bob
  await Alice.sendTransaction( {
    to: Bob.address,
    value: ethers.parseEther("1.0"),
  });
}

// Define the main function to display balances and do some transfers.
async function main() {
  try {
    await getAddressesAndBalances();
    console.log('getAddressesAndBalances completed');

    await performTransfer();
    console.log('performTransfer completed');

    await performTransfer();
    console.log('performTransfer completed a second time');

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
// Call the main function
main();
```
9. Within the project root, i.e., within Lab2_Part1, run the following command
to execute the Javascript code in the scripts directory. Note that we are using the server listening on localhost.
```
npx hardhat run scripts/ListAndTransferBalances.js --network localhost
```
