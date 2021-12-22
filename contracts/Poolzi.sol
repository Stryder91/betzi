//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Poolzi {
    address private owner;
    string private name;

    // match id => Bets
    mapping(uint => Bet) private bets;

    // sc balance
    uint public pool;
    mapping(address => uint) balances;

    struct Bet {
        address better;
        uint amount;
        uint teamId;
    }



    constructor(string memory _name) {
       owner = msg.sender; 
       name = _name;
    }

    function placeBets(uint _matchId, uint _teamId, uint _amount) public returns(Bet memory){
        // Bet memory bet = bets[_matchId];
        Bet memory bet;
        bet.teamId = _teamId;
        bet.amount = _amount;
        bet.better = msg.sender;
        bets[_matchId] = bet;
        return bet;
    }

    function getOneBet(uint _matchId) public view returns(Bet memory) {
        return bets[_matchId];
    }

}
/**
function getAll() public view returns (address[] memory){
address[] memory ret = new address[](addressRegistryCount);
for (uint i = 0; i < addressRegistryCount; i++) {
    ret[i] = addresses[i];
}
return ret;
} */