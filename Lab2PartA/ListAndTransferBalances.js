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
