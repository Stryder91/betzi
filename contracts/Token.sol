//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/utils/math/Math.sol';

contract Token is ERC20 {

    address public owner;

    constructor(uint _initialSupply)
    ERC20("Bubble 5", "BBV"){
        owner = msg.sender;
        _mint(msg.sender, _initialSupply);
    }

    function depositToken(uint _amount) public {
        transfer(address(this), _amount); 
    }

}