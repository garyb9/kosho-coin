// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./chainlink/PriceConsumerV3.sol";


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

  modifier validRecipient(address _recipient) {
    require(_recipient != address(0) && _recipient != address(this));
    _;
  }

  // Constructor
  constructor() payable ERC20("Kosho", "KOSH") {
    owner = msg.sender;
  }

  // Functions

  /**
  * @dev transfer token to a specified address.
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to, uint _value)
    public
    override
    validRecipient(_to)
    returns (bool success)
  {
    return super.transfer(_to, _value);
  }

  /**
   * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
   * @param _spender The address which will spend the funds.
   * @param _value The amount of tokens to be spent.
   */
  function approve(address _spender, uint256 _value)
    public
    override
    validRecipient(_spender)
    returns (bool)
  {
    return super.approve(_spender,  _value);
  }

  /**
   * @dev Transfer tokens from one address to another
   * @param _from address The address which you want to send tokens from
   * @param _to address The address which you want to transfer to
   * @param _value uint256 the amount of tokens to be transferred
   */
  function transferFrom(address _from, address _to, uint256 _value)
    public
    override
    validRecipient(_to)
    returns (bool)
  {
    return super.transferFrom(_from, _to, _value);
  }


  function mint(address account, uint256 amount)
   public 
   restricted {
		_mint(account, amount); // inherited from Openzeppelin ERC20
	}

  function passMinterRole(address _newOwner) 
    public 
    restricted 
    returns(bool){
    owner = _newOwner;

    emit MinterChanged(msg.sender, _newOwner);
    return true;
  }

  
}