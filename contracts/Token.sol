//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/utils/math/Math.sol';

contract Token is ERC20 {
    // mapping(address => uint) balances;
    address public owner;

    constructor(uint _initialSupply)
    ERC20("Bubble 5", "BBV"){
        owner = msg.sender;
        _mint(msg.sender, _initialSupply);
    }

    // function transfer(address _to, uint _amount) external {
    //     require(balances[msg.sender] >= _amount, 'Not enough tokens');
    //     balances[msg.sender] -= _amount;
    //     balances[_to] += _amount;
    // }

    // function balanceOf(address _account) external view returns (uint) {
    //     return balances[_account];
    // }

}