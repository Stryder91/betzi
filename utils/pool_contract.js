import { CONTRACT_POOL_ADDRESS, getAccount } from "./ethers";
import { jsInt } from "./helpers";

// Total token supply
export const getTotalSupply = async (contract) => {
    const totalSupply = await contract.totalSupply();
    return jsInt(totalSupply);
} 

// Poolzi - Smart-contract balance
export const getSCBalance = async (contract) => {
    const sc_balance = await contract.balanceOf(CONTRACT_POOL_ADDRESS);
    return jsInt(sc_balance);
}

// Current metamask user balance
export const getMyBalance = async (contract) => {
    const account = await getAccount();
    const myBalance = await contract.balanceOf(account);
    return jsInt(myBalance);
}

// Get the pool for 1 match according to id.
export const getPool_forAMatch = async (contract, match_id) => {
    let pool_balance = jsInt(await contract.getPool(match_id));
    return pool_balance;
}

// only one bet per person
export const getmyShareInPool = async (contract, match_id, pool) => {
    const allBetsForAMatch = await contract.getBet(match_id);
    let myBets = 0;
    const account = await getAccount();
    allBetsForAMatch.map(bet => {
      if (bet.better == account) {
        myBets += jsInt(bet.amount);
      }
    });
    console.log("_getmyShareInPool", _getmyShareInPool);
    // myBets = `${(pool / myBets).toFixed(2)}%`; 
    return myBets;
}

// async function _getAllBets() {
//     const contract = await connectToPoolContract();
//     const actualBet = await contract.getBet("2");
//     const account = await getAccount();
//     const myBets = [];
//     console.log("getting bets...", actualBet);
//     actualBet.map(bet => {
//       console.log(bet.better, account, bet.better == account);
//       // Pour l'instant on voit tout
//       // if (bet.better == account) {
//       const amount = jsInt(bet.amount);
//       const teamId = jsInt(bet.teamId);
//       const id = jsInt(bet.id);
//       const myBet = {
//         id,
//         better: bet.better,
//         amount, teamId
//       }
//       myBets.push(myBet);
//       // }
//     });
//     return myBets;
//   }

// async function _testAlreadyBet(id) {
//     const contract = await getProviderSigned_pool();
//     try {
//       const response = await contract.checkIfIAlreadyBet(id);
//       console.log("RESPONSE", response);
//     } catch (error) {
//       console.log("Error", error);
//     }
//   }
