##  Fall 2023 Blockchain and SQL Fundamentals
### Carnegie Mellon University MSCF
### Due: Wednesday, November 22, 2023 11:59 PM
### 10 Points
### Deliverable: A single .pdf file named Lab2.pdf with clearly labelled answers.

**Learning Objectives:**

In Part A, we will work without a smart contract. We will start the Hardhat
network in its own shell and interact with the shell via a Javascript program.
Part 1 illustrates client server computing and a simple decentralized payment system.

In Part B, we will work with an ERC20 token contract. ERC20 tokens are at the heart
of many DeFi applications.

## Part A. Writing a client side program to interact with a Hardhat network running locally in its own shell.

1. In an empty directory named Lab2_PartA, begin by setting up an npm package. When prompted, hit return and select the defaults.
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
5. We need to refer to these tools in the config.js file. At top of hardhat.config.js, put the following line:
```
require("@nomicfoundation/hardhat-toolbox");
```
6. Within the directory Lab2_PartA, start a JSON-RPC server that will run on top of the Hardhat Ethereum Virtual Machine. After startup, this server will become available at https://127.0.0.1:8545.
```
npx hardhat node
```
7. Leave this server running in its own shell. Open a new shell and change to the directory Lab2_PartA. Within that shell, create a new subdirectory named scripts.
```
mkdir scripts
```

8. Within the scripts directory [create this Javascript client
named ListAndTransferBalances.js](../../blob/master/Lab2PartA/ListAndTransferBalances.js).

9. Within the project root, i.e., within Lab2_PartA, run the following command
to execute the Javascript code in the scripts directory. Note that we are using the server listening on localhost.
```
npx hardhat run scripts/ListAndTransferBalances.js --network localhost
```

E0. Your server side console should show two transactions. Copy and paste these two
transactions into your single, well labeled pdf file.

E1. How much gas was used by each transaction. Copy and paste your answer into your
single, well labeled pdf file.

E2. How many transactions are being placed into each block. Copy and paste your answer into your
single, well labeled pdf file.

E3. Do the two transactions have the same transaction hash or are they different? Copy and paste
the two transaction hashes into your single, well labeled pdf file.

E4. Write a JavaScript program named ShowFirstThreeBalances.js. Place this program in the scripts directory. Run this program in its own command shell. In your single, well labeled pdf file, show the program itself
as well as the output generated.

## Part B. Working with an ERC20 Token contract

1. We begin by following the instructions from Lab 1 and repeated here.
2. Create a new project directory named Lab2_PartB.

```
mkdir Lab2_PartB

```
3. Change directory into the new directory.

```
cd Lab2_PartB
```
Build a package.json file (holding important information about this project) by running the command (hit return and take the defaults provided):

```
npm init     

```

4. Now, within the Lab2_PartB directory, install hardhat:

```
npm install --save-dev hardhat

```
5. Next, within the Lab2_PartB directory, initialize Hardhat with the Node Package Execute (npx) command:

```
npx hardhat init
```

You will need to select "Create an empty hardhat.config.js".

6. The npx command creates a hardhat.config.js. In addition, if you are asked to do so,
run the following npm command.

```
npm install --save-dev "hardhat@^2.18.2"

```

7. Within the project directory, install the Hardhat toolbox:

```
npm install --save-dev @nomicfoundation/hardhat-toolbox

```
8. We need access to that toolbox and to establish the correct compiler. Change your
hardhat.config.js so that it reads as follows:

```
require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.5.14",
};

```
9. Create a new subdirectory named contracts. Within contracts, [create this smart
contract named MyAdvancedToken.sol](../../blob/master/Lab2PartB/MyAdvancedToken.sol).

10. It is very important that you take some time to study the contract before continuing. It
has documentation designed to get you up and running and shows you how to interact with
the contract using the hardhat console.

11. Using Node Package Execute (npx), compile the code with the following command. We do
this in the directory just above the contracts directory.

Note that this command will download the appropriate compiler.

```
npx hardhat compile

```

12. Now, run the console:

```
npx hardhat console
```
:checkered_flag:**Before beginning, see the checkered flag below that describes how to submit Part B.**


ERC20 Token Problems

In the problems below, Alice, Bob, Charlie, Donna and Emily are associated
with the first five accounts provided in Hardhat. Each begins with 10,000 ether in his or her account.
Use ethers.getSigners(); to establish these names to accounts.

0. Alice has deployed an instance of the MyAdvancedToken contract to
 the blockchain. She gave it the name "Alice Coin" and the symbol AC and an initial
 supply of 1300 tokens.
 Show command(s), that when executed in the Hardhat console, display the number of tokens (Alice Coins) held in her account. For this question you are required to call the balanceOf() method on the contract.

1. Show the command(s), that when executed in the Hardhat console, display the total supply of tokens. For this question you are required to access the totalSupply public variable.

2. Alice would like to know her balance in Ethereum. Show the Hardhat console command(s) that will retrieve and display her Ethereum balance. Note: this is not her token balance.


3. Alice allows Bob to spend 100 tokens on her behalf. Show the
 Hardhat console command(s) and the transaction receipt.
 Also, show Alice's Ethereum balance after she runs the transaction.

4. Step number 3 should have generated an event on Ganache. Show the three values of _owner, _spender, and _value that are available under the Events tab.

5. Alice allows Charlie to spend 50 tokens on her behalf. Show the
 Hardhat console command(s) and the transaction receipt.

6. Show the command(s), that when executed in the Hardhat console, display the number of tokens that Alice has in her account. Use the balanceOf() method.

7. Bob sends 50 of Alice's tokens to Donna. Show the Hardhat console command(s) and the transaction receipt.
 Also, show Bob's Ethereum balance (not tokens) after he runs the transaction.


8. Charlie sends 20 of Alice's tokens to Emily and burns the remaining tokens that Alice provided to Charlie. Show the Hardhat console command(s) and the transaction receipts.


9. Show the command(s) needed to access the totalSupply variable and show the number of tokens remaining.

10. Emily sends 5 of her tokens to Bob. Paste here the
 Hardhat console command(s) and the transaction receipt.
 Also, show Bob's token balance after Emily runs the transaction.


11. Bob sends his 5 tokens to Alice. Paste here the
 Hardhat console command(s) and the transaction receipt.



12. Bob returns his remaining allowance to Alice. Show the
 Hardhat console command(s) and the transaction receipt.
 Also, show Bob's token balance after he runs the transaction.


13. Bob attempts to send 10 tokens to Donna. Show the
 Hardhat console command(s) and the transaction receipt or any errors
 that may occur.



14. Alice sends 100 tokens to the contract without increasing
 the totalSupply. She also sets the buy price to 1 ether and the
 sell price to 2 ether. Paste here the Hardhat console commands and the transaction receipts.


15. Show the command(s) to find and display the contract's ether balance (not the token balance).
Also, show the ether balance.


16. Donna buys 50 ether worth of tokens. Show the
 Hardhat console command(s) and the transaction receipt.


17. Donna no longer enjoys her tokens and wants to sell as many as she can back to the contract. Show the command she uses to sell her tokens and show the returned receipt.


18. Alice wants to have her contract "live free". So, she turns over control of the contract to the contract itself. Show the command she uses to free her contract and show the returned receipt.

19. Alice decides that she wants to mint 5 additional tokens and give them to Bob (increasing the total supply of tokens by 5). Show the command that she would try to use and show any error that may result.


20. Find the token balance of each of our players:

    Alice _________

    Bob   _________

    Charlie _______

    Donna _________

    Emily _________

    contract ______


21. What is the ether balance of
 each of our players:

    Alice _________

    Bob   _________

    Charlie _______

    Donna _________

    Emily _________

    contract ______    

:checkered_flag:**To receive credit for Part B, submit your answers to the 22 questions above in a file named Lab2PartB.pdf. Each answer will be clearly labelled with the question number (0 through 21).**

## Part C. Remix deployment and interaction with an ERC20 Token 5 Points


In this Part, you will deploy the same MyAdvancedToken contract to Remix.

Once deployed, you will need to answer the following questions by using
Remix. Paste your solutions into Lab2PartC.pdf.


Remix Problems
:


In the problems below, Alice, Bob, Charlie, Donna and Emily are associated
with the five accounts as above.  Each has 10,0000 ether in their accounts.

0. Alice deploys an instance of the MyAdvancedToken contract to
 Remix. She gives it the name "Alice Coin" and the symbol "AC" and an initial supply of 1300 tokens.  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show Alice's address.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show the transaction receipt returned to the browser.


1. Alice allows Bob to spend 100 tokens on her behalf.


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show Bob's address.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show the transaction receipt logs returned to the browser.

2. Alice allows Charlie to spend 50 tokens on her behalf.



&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show Charlie's address.


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show the transaction receipt logs.

3. Bob sends 50 of Alice's tokens to Donna.



&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show Donna's address.



&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show the transaction receipt logs.


4. Charlie sends 20 of Alice's tokens to Emily and burns the
 remaining tokens that Alice provided to Charlie.



&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show Emily's address.


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show the first transaction receipt logs.


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show the second transaction receipt logs.


5. Emily sends 5 of her tokens to Bob.


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show the transaction receipt logs.



6. Bob sends his 5 tokens to Alice.



&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show the transaction receipt logs.


7. Bob returns his remaining allowance to Alice.



&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show the transaction receipt logs.


8. Bob attempts to send 10 tokens to Donna.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show the error message.



9. Alice sends 100 tokens to the contract without increasing
 the totalSupply. She also sets the buy price to 1 ether and the
 sell price to 2 ether.



&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show the first transaction receipt logs.


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show the second transaction receipt logs.


10. Donna buys 50 ether worth of tokens.



&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show the transaction receipt logs.


11. Find the token balance of each of our players:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alice

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bob

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Charlie

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Donna

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Emily  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contract  


12. What is the ether balance (to two decimal digits) for:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alice

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bob

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Charlie

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Donna

13. Alice turns control of the contract to the contract itself. What is
the transaction hash?


14. What is the Elliptic curve private key of Alice?


15. Public key cryptography often uses digital certificates. However,
in this lab, we have made no use of digital certificates. Explain why. In your answer,
be sure to say what digital certificates are normally used for and then explain why we do not
need them here. (This requires a little research.)


:checkered_flag:**To receive credit for Part C, submit your answers to the 16 questions above in a file named Lab2PartC.pdf. Each answer will be clearly labelled with the question number (0 through 15). Each answer will be nicely formatted and easy to read.**


:checkered_flag:**Place your three submission documents (Lab2PartA.pdf and Lab2PartB.pdf and Lab2PartC.pdf) into a single directory and zip that directory. Name the zip file <your-andrew-id>Lab2.zip. Submit this single zip file to Canvas.**


## Grading rubric for the materials in the submission directory
One zip file named Lab2.zip will be submitted on Canvas for grading.

+ 4 points for successful completion of Part A
+ 1 point for correct submission and clear labelings of Part A
+ 9 points for successful completion of Part B
+ 1 point for correct submission and clear labelings of Part B
+ 4 points for successful completion of Part C
+ 1 point for correct submission and clear labelings of Part C

Penalty for any late  work
==========================
+ -1 point per day late
