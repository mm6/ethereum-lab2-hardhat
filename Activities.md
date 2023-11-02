Deploy MyAdvancedToken.sol and call the constructor
with 1300 tokens for Alice. The name is "Alice Coin" and the symbol
is "AC".

Name the first four accounts Alice, Bob, Charlie, and Donna.

Place the address of the contract into a variable named contract.

Show the balance of the first account in eth and wei.

This state variable holds the address of the owner
// In a Hardhat script, access with:
//


// Establish a new owner.
// The owner calls with the address of the new owner.
// Suppose deployer Alice gives ownership to Bob.
// In truffle app.transferOwnership(Bob).then( n => {c = n})
// In a Hardhat script, access with:
function transferOwnership(address newOwner) onlyOwner public {
    owner = newOwner;
}


// Public variables of the token
string public name;
string public symbol;
uint8 public decimals = 18;

/* We can read these data from truffle with command such as
 app.name().then( n => {c = n})
 c
*/



/* To access totalSupply in Hardhat
app.totalSupply().then( n => {c = n})
c.toString();
*/


/* To access balanceOf in Hardhat do the following:
app.balanceOf(Alice).then( n => {c = n})
c.toString();
*/


// access with truffle. How much has Alice allowed Bob to use?

/*
 app.allowance(Alice,Bob).then( n => {c = n})
 c.toString();
*/



// This generates a public event on the blockchain that can be
// used to notify clients.
// In truffle, upon receipt of response c, examine c.logs[0].args

Called from truffle with:
Alice (sending transaction) transfers 50 tokens to Bob
app.transfer(Bob,'50000000000000000000').then( n => {c = n})
c
c is a receipt
c.logs shows the Transfer event
c.logs[0]
c.logs[0].logIndex
v = c.logs[0].args.value
v.toString()   shows '50000000000000000000'

Bob transfers 50 tokens to Charlie.
Bob's address included in the transaction.
Bob pays for this in ether.
app.transfer(Charlie,'50000000000000000000',{from:Bob}).then( n => {c = n})


The approve call occurs prior to a transferFrom.

truffle: Bob approves Charlie to spend 25 tokens.
app.approve(Charlie,'25000000000000000000',{from:Bob}).then( n => {c = n})
=================

for Bob to spend. Bob initiates the transfer request.
In truffle:
    Charlie sends 10 of Bob's tokens to Donna.
    app.transferFrom(Bob,Donna, '10000000000000000000',{from:Charlie}).then( n => {c = n})

=================

    The approve and call call occurs prior to a transferFrom.

    truffle: Requires another deployed contract and the second deployed
    contract must have a receiveApproval function.

    Suppose Bob approves a contract to spend 25 tokens.
    app.approveAndCall(contract,'25000000000000000000',"0x00",{from:Bob}).then( n => {c = n})

===================

truffle: Suppose Bob wants to burn a 1 token

app.burn('1000000000000000000',{from:Bob}).then( n => {c = n
and view the burn event in the logs.
c.logs[0].event
'Burn'

===================
Truffle: Bob wants to burn 3 token of those tokens that he may spend
from Alice's account.

app.burnFrom(Alice,'3000000000000000000', {from:Bob}).then( n => {c = n})

===================

/* In truffle we can view these prices:
app.sellPrice({from:Bob}).then(n => { c = n})
c.toString()
*/

==================
/* In truffle we can view the mapping. Is Donna frozen?
app.frozenAccount(Donna,{from:Bob}).then(n => { c = n})
c.toString()
false
*/

==================

/* Suppose Alice wants to add 5 tokens to Bob's account.

   In truffle:
   app.mintToken(Bob,'5000000000000000000',{from:Alice}).then(n => { c = n})
   c

   c is a receipt
   c.logs shows two Transfer events
   c.logs[0]  shows zero address to contract address of 5 tokens
   c.logs[1]  shows contract address to Bob's address of 5 tokens

   v = c.logs[1].args.value
   v.toString() shows '5000000000000000000'
*/
=====================================

/* Suppose Alice wants to freeze the account of Donna.
   In truffle:
   app.freezeAccount(Donna,true,{from:Alice}).then(n => { c = n})

   c is a receipt
   c.logs shows one FrozenFunds event.
   c.logs[0]  shows the specified address and frozen is true.

   v = c.logs[0].args.frozen
   true
*/
=================================
/* Suppose Alice wants to set the sell price at 2 eth and the buy price at 1 eth.
   In truffle:

   app.setPrices('2','1',{from:Alice}).then(n => { c = n})
*/
==============================

// Function buy is public and since it is 'payable' it may be passed ether.
// The idea is to send ether to the contract's ether account in
// exchange for tokens going into the sender's token account.
// The contract will need to have some tokens in its token account
// before any buys can succeed.
// The ether account (the contract's balance) is maintained by
// Ethereum and is not the same as the contract's token account.
// The buyPrice is expressed in ether and was established by the owner.
// The buyer sends along a value that is expressed in wei.
// The contract needs tokens to sell. So, lets assume that prior
// to a buy call by Charlie, Alice performed the following two steps.
// First, she assigns the variable 'contract' to the address
// of the contract.
// contract = '0xDDec5bf035cEf613dc3cb130B0aED7172e04a35d'
// Second, she might mint 5 tokens for the contract.
// app.mintToken(contract,'5000000000000000000',{from:Alice}).then(n => { c = n})
// Precondition: The contract must have tokens in its token account.
//               The caller must have an account with sufficient funds to
//               cover the cost of gas and the cost of tokens.
// Postcondition: Tokens are transferred to the caller's token account.
//                Ether is placed into the contract's Ether account.
//                Miners take some ether based on gas used and the
//                price of gas.
//                A transfer event is published.
//

/* Suppose Charlie would like to buy 2 ether worth of tokens from the
 * contract. Suppose the buy price is 4 eth per token.
 * Truffle:
 * app.buy({from:Charlie, value:2000000000000000000}).then(n => { c = n})
 * The function will compute amount = 2000000000000000000 / 4 producing the
 * correct amount in the correct format.
*/

==================================
// Suppose the caller wants to sell 1 token.
// The token's ether balance must be >= 1 * 2 = 2.
// How do we check the contract's ether balance?

// In truffle:
// bal = web3._extend.utils.fromWei(web3.eth.getBalance(contract), 'ether')
// bal.toNumber()
