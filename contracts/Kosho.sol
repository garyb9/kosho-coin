// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// inherits from openzeppelin
contract Kosho is ERC20 {
  // Variables
  address public owner; 

  // Events
  event MinterChanged(address indexed from, address indexed to);

  // Modifiers
  modifier restricted() {
    require(
      msg.sender == owner,
      "Error: This function is restricted to the contract's owner"
    );
    _;
  }

  // Constructor
  constructor() payable ERC20("Kosho", "KOSH") {
    owner = msg.sender;
  }

  // Functions
  function passMinterRole(address _newOwner) public restricted returns(bool){
    owner = _newOwner;

    emit MinterChanged(msg.sender, _newOwner);
    return true;
  }

  function mint(address account, uint256 amount) public restricted {
		_mint(account, amount); // inherited from Openzeppelin ERC20
	}
}