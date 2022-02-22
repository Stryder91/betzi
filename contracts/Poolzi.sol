//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "hardhat/console.sol";

contract Poolzi is ERC20 {
    using SafeMath for uint256;
    address private owner;
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
    // user addr => [matchId1, matchId2, matchId3, ...]
    mapping(address => uint[]) private userBets;

    // Array of all match_id 
    uint[] private allMatchIds;

    // sc balance
    uint public sc_pool;

    constructor()
    ERC20("Bubble Token", "BBT") {
        owner = msg.sender;
        betId = 0;
        // tokenContract = IERC20(_tokenContract);
        _mint(msg.sender, _initialSupply);
    }

    function placeBets(uint _matchId, uint _teamId, uint _amount) public payable returns(bool){
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

    // function allMyBets() public view returns(Bet[] memory) {
    //     Bet[] memory allmyBets;
    //     uint allMLn = allMatchIds.length;

    //     for (uint i=0; i<allMLn; i++) {
    //         uint betLn = bets[allMatchIds[i]].length;
    //         Bet memory betzzz = bets[allMatchIds[i]];
    //         for (uint j=0; j<betLn; j++) {
    //             if (betzzz.better == msg.sender) {
    //                 allmyBets.push(betzzz);
    //             }
    //         }
    //     }
    //     return allmyBets;
    // }

    Bet[] private newAllBets;
    function cancelBet(uint _matchId) public payable returns(string memory){
        delete newAllBets;
        Bet[] memory betsForAMatch = bets[_matchId];
        uint betsLg = betsForAMatch.length; 
        for (uint i=0; i<betsLg; i++) {
            if(betsForAMatch[i].better == msg.sender){
                console.log("In if");
                require(balanceOf(address(this))>= 10, 'Contract doesnot have that amount');
                payable(msg.sender).transfer(10);
                // transfer(msg.sender, 10 * 10**18);
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

    function getAllUserBet() public view returns(uint[] memory) {
        return userBets[msg.sender];
    }

    // get a pool among all matches
    function getPool(uint _matchId) public view returns(uint) {
        return matchPools[_matchId];
    }

    function getAllPools() public view returns(uint[] memory){
        return allMatchIds;
    }

    function getSCBalance() public view returns(uint) {
        return address(this).balance;
    }

    function whoIsOwner() public view returns(address) {
        return owner;
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

//  ERC20(tracker_0x_address).transferFrom(msg.sender, address(this), tokens);