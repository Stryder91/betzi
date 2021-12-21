//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Poolzi {
    address public owner;

    string public name;

    // sc balance
    uint public pool;
    mapping(address => uint) balances;

    struct Bet {
        address better;
        uint amount;
        uint teamId;
    }

    // match id => Bets
    mapping(uint => Bet) bets;


    constructor(string memory _name) {
       owner = msg.sender; 
       name = _name;
    }

    function placeBets(uint _matchId, uint _teamId, uint _amount) public returns(Bet memory){
        Bet memory bet = bets[_matchId];
        bet.teamId = _teamId;
        bet.amount = _amount;
        bet.better = msg.sender;
        bets[_matchId] = bet;
        return bet;
    }
}