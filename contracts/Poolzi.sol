//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8;

import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Poolzi is Ownable {
    using SafeMath for uint256;
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
    mapping(uint => uint) private matchPools;

    // Array of all match_id 
    uint[] private allMatchIds;

    // sc balance
    uint public sc_pool;

    constructor(string memory _name, address _tokenContract) {
       name = _name;
       betId = 0;
       tokenContract = IERC20(_tokenContract);
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
        return false;
    }

    function depositTokenPool(uint _amount) public {
        tokenContract.transferFrom(msg.sender, address(this), _amount);
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

    function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }

    function getBalance(address _addr) public view returns(uint) {
        return tokenContract.balanceOf(_addr);
    }

    function getTokenAddress() public view returns(IERC20) {
        return tokenContract;
    }

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

interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}
