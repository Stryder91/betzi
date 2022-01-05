//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "hardhat/console.sol";

contract Poolzi is ERC20, Ownable {
    using SafeMath for uint256;
    uint _initialSupply = 5000 * (10**18);
    uint private betId;
    // address private tokenContract;
    // IERC20 public tokenContract;

    event BetEvent(uint id, address indexed better, uint amount);

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
        require(canIBet(_matchId) == true, "Msg sender already bet!");
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
        emit BetEvent(betId, msg.sender, _amount);
        return false;
    }

    // pass it to private later
    function canIBet(uint _matchId) view public returns(bool){
        Bet[] memory betsForAMatch = bets[_matchId];
        uint betsLg = betsForAMatch.length; 
        for (uint i=0; i<betsLg; i++) {
            require(betsForAMatch[i].better != msg.sender, 'Already bet!');
        }
        return true;
    }

    Bet[] private newAllBets;
    function cancelBet(uint _matchId) public returns(string memory){
        delete newAllBets;
        Bet[] memory betsForAMatch = bets[_matchId];
        uint betsLg = betsForAMatch.length; 
        for (uint i=0; i<betsLg; i++) {
            if(betsForAMatch[i].better == msg.sender){
                transfer(msg.sender, betsForAMatch[i].amount);
                return "betsForAMatch[i].better == msg.sender";
            } else {
                //  cancel our bet from new bets array
                newAllBets.push(betsForAMatch[i]);
            }
        }
        bets[_matchId] = newAllBets;
        // cannot cancel because no bet was made
        // return false
        return "Pas de transfert";
    }

    // should be only owner
    function getBet(uint _matchId) public view returns(Bet[] memory) {
        return bets[_matchId];
    }

    // get a pool among all matches
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
