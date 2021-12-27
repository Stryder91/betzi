//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Poolzi {
    address private owner;
    string private name;
    uint private betId;
    // address private tokenContract;
    IERC20 public tokenContract;

    struct Bet {
        uint id;
        address better;
        uint amount;
        uint teamId;
    }

    // match id => [betsForAMatch1, betsForAMatch2, ...]
    mapping(uint => Bet[]) private bets;
    // match id => amount in that pool
    mapping(uint => uint) private balances;

    // sc balance
    uint public pool;

    constructor(string memory _name, address _tokenContract) {
       owner = msg.sender; 
       name = _name;
       betId = 0;
       tokenContract = IERC20(_tokenContract);
    }

    function placeBets(uint _matchId, uint _teamId, uint _amount) public returns(bool){
        // require(_amount > 0, "Bet amount cannot be null");
        // bool alreadyBet;
        betId += 1;
        Bet memory bet;
        bet.id = betId;
        bet.teamId = _teamId;
        bet.amount = _amount;
        bet.better = msg.sender;
        // Bet[] memory betsOnThisMatch = bets[_matchId];
        // for (uint i=0; i<= betsOnThisMatch.length; i++) {
        //     if (betsOnThisMatch[i].better == msg.sender){
        //         alreadyBet = true;
        //     }
        // }
        // if (!alreadyBet) {
        //     bets[_matchId].push(bet);
        //     return true;
        // }

        bets[_matchId].push(bet);
        tokenContract.transferFrom(msg.sender, address(this), 10 * 10^18);

        // transfer(address(this), _amount);
        return false;
    }

    // should be only owner
    function getBet(uint _matchId) public view returns(Bet[] memory) {
        return bets[_matchId];
    }

    function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }

    function getTokenAddress() public view returns(IERC20) {
        return tokenContract;
    }
    // function getOneBet(uint _matchId) public view returns(Bet memory) {
    //     Bet[] memory allBets = bets[_matchId];
    //     for (uint i=0; i<= allBets.length; i++) {
    //         if(allBets[i]. == 
    //     }
    // }

}
/**
function getAll() public view returns (address[] memory){
address[] memory ret = new address[](addressRegistryCount);
for (uint i = 0; i < addressRegistryCount; i++) {
    ret[i] = addresses[i];
}
return ret;
} */