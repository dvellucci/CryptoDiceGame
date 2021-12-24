// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Payable {
    //Payable address can receive Ether
    //The wallet calling this smart contract would be the owner
    address payable public owner;

    // Payable constructor can receive Ether
    constructor() payable {
        owner = payable(msg.sender);
    }

   function deposit() public payable {}

    // Call this function along with some Ether.
    // The function will throw an error since this function is not payable.
    function notPayable() public {}

    // Function to withdraw all Ether from this contract.
    function withdraw(uint amount) public {
        //check if there is enough eth in the contract to withdraw
        require(amount < address(this).balance, "The contract does not hold enough ETH.");
        owner.transfer(amount);
    }

    function getContractBalance() public view returns (uint256) { //view amount of ETH the contract contains
        return address(this).balance;
    }

    function rollDice() private {
 
    }
}