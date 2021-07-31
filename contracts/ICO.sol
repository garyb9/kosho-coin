// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./KoshoToken.sol";

contract ICO {

    using SafeMath for uint;
    
    // Variables
    address     admin; // secret admin
    uint256     public tokenPrice;
    uint256     public tokensSold;
    KoshoToken  public tokenContract;

    // Events
    event Sell(address indexed _buyer, uint256 _amount);

    // Constructor
    constructor(KoshoToken _tokenContract, uint256 _tokenPrice){
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    // Functions

    function buyTokens(uint256 _numOfTokens) public payable{
        (bool success, uint256 val) = SafeMath.tryMul(_numOfTokens, tokenPrice);
        require(success);
        require(msg.value == val); // checks value is a multiple of the numOfTOkens provided and the current price
        require(tokenContract.balanceOf(address(this)) >= _numOfTokens); // checks token balance of this contract
        require(tokenContract.transfer(msg.sender, _numOfTokens)); // transfer to sender the requested amount of tokens
        tokensSold += _numOfTokens;
        emit Sell(msg.sender, _numOfTokens);
    }
}