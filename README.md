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


## Part 2. Working with an ERC20 Token contract

1. We begin by following the instructions from Lab 1 and repeated here.
2. Create a new project directory named Lab2_Part2.

```
mkdir Lab2_Part2

```
3. Change directory into the new directory.

```
cd Lab2_Part2
```
Build a package.json file (holding important information about this project) by running the command (hit return and take the defaults provided):

```
npm init     

```

4. Now, within the Lab2_Part2 directory, install hardhat:

```
npm install --save-dev hardhat

```
5. Next, within the Lab2_Part2 directory, initialize Hardhat with the Node Package Execute (npx) command:

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
9. Create a new subdirectory named contracts. Within contracts, create the following smart
contract named MyAdvancedToken.sol:

```

// =========================== MyAdvancedToken.sol Contract =================

/* MyAdvancedToken.sol

   Modified from https://ethereum.org/token.

   This contract has instructional documentation.
*/

pragma solidity >=0.4.22 <0.6.0;

contract owned {
    // This state variable holds the address of the owner
    // In a Hardhat script, access with:
    //

    address public owner;
    // The original creator is the first owner.

    // The constructor is called once on first deployment.
    constructor() public {
        owner = msg.sender;
    }


    // Add this modifier to restrict function execution
    // to only the current owner.

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }


    // Establish a new owner.
    // The owner calls with the address of the new owner.
    // Suppose deployer Alice gives ownership to Bob.
    // In a Hardhat script, do this with:
    function transferOwnership(address newOwner) onlyOwner public {
        owner = newOwner;
    }
}


// This interface may be implemented by another contract on the blockchain.
// We can call this function in the other contract.
// We are telling the other contract that it has been approved to
// withdraw from a particular address up to a particular value.
// We include the address of this token contract.

interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes calldata _extraData) external; }

contract TokenERC20 {

    // Public variables of the token
    string public name;
    string public symbol;
    uint8 public decimals = 18;

    /* We can read these data from a Hardhat script with a command such as

    */

    // totalSupply established by constructor and increased
    // by mintToken calls

    uint256 public totalSupply;

    /* To access totalSupply in Hardhat do the following:

    */

    // This creates an array with all balances.
    // Users (Alice, Bob, Charlie) may have balances.
    // So may the contract itself have a balance.
    // 0 or more addresses and each has a balance.

    mapping (address => uint256) public balanceOf;

    // The token balances are kept with 10^decimal units.
    // If the number of tokens is 1 and we are using 2 decimals
    // then 100 is stored.

    /* To access balanceOf in Hardhat do the following:

    */

    // 0 or more addresses and each has 0 or more addresses each with
    // an allowance.
    // The allowance balances are kept with 10^decimal units.

    mapping (address => mapping (address => uint256)) public allowance;

    // access with Hardhat. How much has Alice allowed Bob to use?
    /*

    */

    // This generates a public event on the blockchain that can be
    // used to notify clients.
    // In Hardhat,
    /*

    */

    event Transfer(address indexed from, address indexed to, uint256 value);

    // This generates a public event on the blockchain that can be
    // used to notify clients.

    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    // This can be used to notify clients of the amount of tokens burned.

    event Burn(address indexed from, uint256 value);

    /**
     * Constructor function executes once upon deployment.
     *
     * Initializes the contract with an initial supply of
     * tokens and gives them all to the creator of the
     * contract.
     */

    constructor(
        uint256 initialSupply,
        string memory tokenName,
        string memory tokenSymbol
    ) public {
        // In traditional money, if the initialSupply is 1 dollar then
        // the value stored would be 1 x 10 ^ 2 = 100 cents.
        totalSupply = initialSupply * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
        name = tokenName;
        symbol = tokenSymbol;
    }



    /**
     * Internal transfer, only can be called by this contract.
     * Move tokens from one account to another.
     * Preconditions are specified in the require statements.
     */

    function _transfer(address _from, address _to, uint _value) internal {
        // Prevent transfer to 0x0 address. Use burn() instead
        require(_to != address(0x0));

        // Check if from has enough
        require(balanceOf[_from] >= _value);

        // Check for overflows
        require(balanceOf[_to] + _value > balanceOf[_to]);

        // Save this for an assertion in the future
        uint previousBalances = balanceOf[_from] + balanceOf[_to];

        // Subtract from the from address
        balanceOf[_from] -= _value;

        // Add the same to the recipient
        balanceOf[_to] += _value;

        // Make notification of the transfer
        emit Transfer(_from, _to, _value);

        // Asserts are used to use static analysis to find bugs in your code.
        // They should never fail
        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);
    }



     /* Public transfer of tokens.
        Calls the internal transfer with the message sender as 'from'.
        The caller transfers its own tokens to the specified address.
        precondition: The caller has enough tokens to transfer.
        postcondition: The caller's token count is lowered by the passed value.
                       The specified address gains tokens.


    */

    function transfer(address _to, uint256 _value) public returns (bool success) {
        _transfer(msg.sender, _to, _value);
        return true;
    }



     /* This is a public approve function.
        The message sender approves the included address to
        spend from the sender's account. The upper limit of this approval
        is also specified.
        It only modifies the allowance mapping.
        sender --> spender ---> amount.
        This generates an Approval event in the receipt log.
        The approve call occurs prior to a transferFrom.
     */

    function approve(address _spender, uint256 _value) public
        returns (bool success) {

        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);

        return true;
    }


     /* This is a public transferFrom function.
        It allows an approved sender to spend from another account.
        Preconditions: The message sender has been approved by the specified
        from address. The approval is of enough value.

        Postcondition: Reduce how much more may be spent by this sender.
        Perform the actual transfer from the 'from' account to the 'to' account.
        Bob pays Charlie from Alice's account. Alice issued a prior approval
        for Bob to spend. Bob initiates the transfer request.

    */

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender]);     // Check allowance
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }



     /* This is a public approve and call function.
        It provides an allowance for another contract and informs
        that contract of the allowance.
        The message sender approves the included address (a contract) to
        spend from the sender's account. The upper limit of this approval
        is also specified.

        It only modifies the allowance mapping.
        sender --> contract spender ---> amount.
        Because of the approve call, this generates an Approval event in
        the receipt log.

        The approve and call call occurs prior to a transferFrom.


     */

    function approveAndCall(address _spender, uint256 _value, bytes memory _extraData)
        public
        returns (bool success) {

        tokenRecipient spender = tokenRecipient(_spender);
        if (approve(_spender, _value)) {
            spender.receiveApproval(msg.sender, _value, address(this), _extraData);
            return true;
        }
    }



     /* This is a public burn function.
        The sender loses tokens and the totalSupply is reduced.

        precondition: The sender must have enough tokens to burn.

        postcondition: The sender loses tokens and so does totalSupply.
                       A burn event is published.

    */

    function burn(uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        totalSupply -= _value;
        emit Burn(msg.sender, _value);
        return true;
    }


     /* This is a public function to burn some tokens that the sender (Bob)
        has been approved to spend from the approver's (Alice) account.

        Suppose Alice has allowed Bob to spend her tokens.
        Bob is allowed to burn them if he wants.
        Suppose he wants to burn 3 of the tokens that Alice has provided.
        Bob calls burnFrom(Alice,3)

        Precondition:
                      Alice must have the required number of tokens.
                      Alice must have approved Bob to use at least that number.

        Postcondition: Deduct tokens from Alice.
                       Decrease the number of tokens Bob has been approved to spend.
                       Decrease the totalSuppy of tokens.
                       Publish a Burn event.

        Suppose Bob wants to burn 3 token of those tokens that he may spend
        from Alice's account.

        Hardhat:
     */

    function burnFrom(address _from, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        allowance[_from][msg.sender] -= _value;
        totalSupply -= _value;
        emit Burn(_from, _value);
        return true;
    }

}



// MyAdvancedToken inherits from owned and TokenERC20

contract MyAdvancedToken is owned, TokenERC20 {

    // This contract will buy and sell tokens at these prices
    uint256 public sellPrice;
    uint256 public buyPrice;

    // We can freeze and unfreeze accounts
    mapping (address => bool) public frozenAccount;

    /* Suppose we want to view the mapping. Is Donna frozen?

    */


    /* The function freezeAccounts publishes an event on the blockchain
       that will notify clients of frozen accounts.
    */

    event FrozenFunds(address target, bool frozen);


    // This is a public constructor.
    // It initializes the contract with an initial supply of tokens
    // and assigns those tokens to the deployer of the contract.
    // It also assigns a name and a symbol.
    // This constructor calls the parent constructor (TokenERC20).
    // It does nothing else after the call to the TokenERC20 constructor.

    constructor(
        uint256 initialSupply,
        string memory tokenName,
        string memory tokenSymbol
    ) TokenERC20(initialSupply, tokenName, tokenSymbol) public {}

    /* This is an internal function. It can only be called by this contract.
       It does not use an implied sender. It simply transfers tokens from
       one account to another and both accounts are supplied as arguments.

       Preconditions: The recipient may not be the zero address. Use burn instead.
                      The source must have sufficient funds.
                      No overflow is permited.
                      Neither account may be frozen.

       Postconditions: Tokens are transferred.
                       An event is published.
    */

    function _transfer(address _from, address _to, uint _value) internal {
        require (_to != address(0x0));
        require (balanceOf[_from] >= _value);
        require (balanceOf[_to] + _value >= balanceOf[_to]);
        require(!frozenAccount[_from]);
        require(!frozenAccount[_to]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
    }


    // This function is public but may only be called by the owner
    // of the contract.
    // It adds tokens to the supplied address.

    /* Suppose Alice wants to add 5 tokens to Bob's account.

       In Hardhat:

    */

    function mintToken(address target, uint256 mintedAmount) onlyOwner public {

        balanceOf[target] += mintedAmount;
        totalSupply += mintedAmount;

        emit Transfer(address(0), address(this), mintedAmount);
        emit Transfer(address(this), target, mintedAmount);
    }

    // This function is public but may only be called by the owner
    // of the contract.
    // The owner may freeze or unfreeze the specified address.
    // Precondition: Only the owner may call.
    // Postcondition: The specified account is frozen or unfrozen.
    //                A FrozenFunds event is published.

    /* Suppose Alice wants to freeze the account of Donna.
       In Hardhat:

    */

    function freezeAccount(address target, bool freeze) onlyOwner public {
        frozenAccount[target] = freeze;
        emit FrozenFunds(target, freeze);
    }


    // This function is public but may only be called by the owner
    // of the contract.
    // It allows the owner to set a sell price and a buy price in eth.

    /* Suppose Alice wants to set the sell price at 2 eth and the buy price at 1 eth.
       In Hardhat:

    */

    function setPrices(uint256 newSellPrice, uint256 newBuyPrice) onlyOwner public {
        sellPrice = newSellPrice;
        buyPrice = newBuyPrice;
    }



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
    // In Hardhat:

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
     * In Hardhat:
     *
     * The function will compute amount = 2000000000000000000 / 4 producing the
     * correct amount in the correct format.
    */

    function buy() payable public {
        uint amount = msg.value / buyPrice;
        _transfer(address(this), msg.sender, amount);
    }

    // This is a public function but does not take in ether.
    // It is not marked as 'payable'. There needs to be ether
    // in the contract's account for it to be able to buy these
    // tokens from the caller.

    // Suppose the caller wants to sell 1 token.
    // The token's ether balance must be >= 1 * 2 = 2.
    // How do we check the contract's ether balance?

    // In Hardhat:
    // 
    // Precondition:  The contract has enough ether to buy these tokens
    //                at the sell price.
    // Postconditions:The tokens are added to the contract's account.
    //                Tokens are deducted from sender's account.
    //                Ether is transferred from contract's ether account
    //                to sender's ether account.

    function sell(uint256 amount) public {
        address myAddress = address(this);
        require(myAddress.balance >= amount * sellPrice);
        _transfer(msg.sender, address(this), amount);

        // It's important to do this transfer last to avoid recursion attacks.
        msg.sender.transfer(amount * sellPrice);
    }
}

```
10. Using Node Package Execute (npx), compile the code with the following command. We do
this in the directory just above the contracts directory.

Note that this command will download the appropriate compiler.

```
npx hardhat compile

```

Now, run the console:

```
npx hardhat console


const Token = await ethers.getContractFactory("MyAdvancedToken");


const token = await Token.deploy(100,"Tok","Tok");

token.target
'0x5FbDB2315678afecb367f032d93F642f64180aa3'

let totalSupply = await token.totalSupply();


console.log(totalSupply);
100000000000000000000n
```

11. Leave the console with crtl-D.

12. Start a JSON-RPC server on top of the Hardhat Ethereum Virtual Machine. This
server is available at https://127.0.0.1:8545.
```
npx hardhat node
```
13. Leave this server running in its own shell. Open a new shell and change to the directory Lab2_Part2. Within that shell, create a new subdirectory named scripts.
```
mkdir scripts

```
14. Whitin the scripts directory, store the file named InteractWithMyAdvancedToken.js. This file is shown next:


```
// InteractWithMyAdvancedToken.js.js
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
// Define a function to perform an ether transfer
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


15. Within the project root, i.e., within Lab2_Part2, run the following command
to execute the Javascript code in the scripts directory. Note that we are using the server listening on localhost.

```
npx hardhat run scripts/InteractWithMyAdvancedToken.js --network localhost

```
