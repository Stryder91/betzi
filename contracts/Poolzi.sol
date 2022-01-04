//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Poolzi is ERC20, Ownable {
    using SafeMath for uint256;
    uint _initialSupply = 5000 * (10**18);
    uint private betId;
    // address private tokenContract;
    // IERC20 public tokenContract;

    struct Bet {
        uint id;
        address better;
        uint amount;
        uint teamId;
    }

    // match id => [betsForAMatch1, betsForAMatch2, ...]
    mapping(uint => Bet[]) private bets;
    // match id => amount in that pool
    mapping(uint => uint) private matchPools;

    // Array of all match_id 
    uint[] private allMatchIds;

    // sc balance
    uint public sc_pool;

    constructor()
    ERC20("Bubble Token", "BBT") {
       betId = 0;
       // tokenContract = IERC20(_tokenContract);
       _mint(msg.sender, _initialSupply);
    }

    function placeBets(uint _matchId, uint _teamId, uint _amount) public returns(bool){
        // require(_amount > 0, "Bet amount cannot be null");
        betId += 1;
        Bet memory bet;
        bet.id = betId;
        bet.teamId = _teamId;
        bet.amount = _amount;
        bet.better = msg.sender;

        bets[_matchId].push(bet);
        sc_pool += _amount;
        matchPools[_matchId] += _amount;

        allMatchIds.push(_matchId);
        transfer(address(this), _amount); 
        return false;
    }

    function depositTokenPool(uint _amount) public returns(bool){
        transfer(address(this), _amount);
        return true;
    }

    // should be only owner
    function getBet(uint _matchId) public view returns(Bet[] memory) {
        return bets[_matchId];
    }

    // get pool
    function getPool(uint _matchId) public view returns(uint) {
        return matchPools[_matchId];
    }

    function getAllPools() public view returns(uint[] memory){
        return allMatchIds;
    }

    // function getTokenAddress() public view returns(IERC20) {
    //     return tokenContract;
    // }

}
// function getOneBet(uint _matchId) public view returns(Bet memory) {
//     Bet[] memory allBets = bets[_matchId];
//     for (uint i=0; i<= allBets.length; i++) {
//         if(allBets[i]. == 
//     }
// }
/**
function getAll() public view returns (address[] memory){
address[] memory ret = new address[](addressRegistryCount);
for (uint i = 0; i < addressRegistryCount; i++) {
    ret[i] = addresses[i];
}
return ret;
} */
