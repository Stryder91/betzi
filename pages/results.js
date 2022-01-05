import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

import { 
  connectToTokenContract, 
  connectToPoolContract, 
  getAccount, 
  getProviderSigned_token, 
  getProviderSigned_pool, 
  CONTRACT_POOL_ADDRESS
} from '../utils/ethers'
import { amountToPercentage, formatDate, jsInt } from '../utils/helpers'
// import { getMatches, Hello } from './api/csgo'
import allResultsData_ from '../utils/data/results.json';

export default function Results() {

  const [matches, setAllMatches] = useState([]);
	const [contract, setContract] = useState();
  const [supply, setSupply] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(async () => {
    const contract = await connectToTokenContract();
    setContract(contract);
    _getSupply(contract);
    _getBalance(contract);
    _setPoolInMatch()
  }, []);
  
  async function _getPoolandShare(match_id) {
    const poolandShare = {pool: 0, share: 0}; 
    const contract = await connectToPoolContract();
    const actualPool = await _getPool(contract, match_id);
    const actualShare = await _getmyShareInPool(contract, match_id, actualPool);
    poolandShare =  {
      pool: actualPool,
      share: actualShare,
    }
    return poolandShare;
  }

  async function _getPool(contract, match_id) {
    let pool_balance = jsInt(await contract.getPool(match_id));
    return pool_balance;
  }

  async function _getmyShareInPool(contract, match_id, pool) {
    const allBetsForAMatch = await contract.getBet(match_id);
    let myBets = 0;
    const account = await getAccount();
    allBetsForAMatch.map(bet => {
      if (bet.better == account) {
        myBets += jsInt(bet.amount);
      }
    });
    console.log("My SHARE", myBets, );
    return myBets;
  }

  async function _setPoolInMatch() {
    const allMatches = allResultsData_;
    const matchesLg = allMatches.length;
    console.log("Coucou");
    for (let i=0; i<matchesLg; i++) {
      console.log("pool_balance", allMatches[i].id);
      // const pool_balance = await _getPool(allMatches[i].id);
      const myPaS = await _getPoolandShare(allMatches[i].id);
      allMatches[i].poolAmount = myPaS.pool;
      allMatches[i].myShare =  myPaS.share;
    }
    console.log("ALL matches", allMatches);
    setAllMatches(allMatches);
  }

  async function _getSupply(contract) {
    const totalSupply = await contract.totalSupply();
    setSupply(jsInt(totalSupply));
  } 
  
  async function _getBalance(contract) {
    const account = await getAccount();
    const balanceOfUser = await contract.balanceOf(account);
    setBalance(jsInt(balanceOfUser));
  }

  async function _getAllBets() {
    const contract = await connectToPoolContract();
    const actualBet = await contract.getBet("2");
    const account = await getAccount();
    const myBets = [];
    console.log("getting bets...", actualBet);
    actualBet.map(bet => {
      console.log(bet.better, account, bet.better == account);
      // Pour l'instant on voit tout
      // if (bet.better == account) {
      const amount = jsInt(bet.amount);
      const teamId = jsInt(bet.teamId);
      const id = jsInt(bet.id);
      const myBet = {
        id,
        better: bet.better,
        amount, teamId
      }
      myBets.push(myBet);
      // }
    });
    return myBets;
  }

  console.log("STATE", matches);
	return(
		<main className={styles.main}>
      <p>Results</p>
			<p>Supply is : {supply}</p>
			<p>My balance is : {balance} </p>
        {
          matches && matches.length > 0 ?
          matches.map(m => {
            return <div className='bet-card flex flex-wrap'>
              <div className='w-1/2 m-auto text-center'>
                <p> {m.team1.name} vs {m.team2.name} </p>
                <p> Start : {formatDate(m.date)}</p>
              </div>
              <div className='flex w-3/4 m-auto flex justify-between'>
                <div className='card'>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bet1">
                    {m.team1.name}
                    </label>
                  </div>
                </div>
                <div className='card'>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bet2">
                    {m.team2.name}
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <p>Match id : {m.id}</p>
                <p>Format: {m.format}</p>
              </div>
              <div className='m-auto text-center'>
                <p> Pool : {m.poolAmount ? m.poolAmount : 0} and my share : {m.myShare ? amountToPercentage(m.poolAmount, m.myShare) : 0}</p>
								<button>Claim</button>
							</div>
            </div> 
          })
          : null
        }
      <button onClick={() => _getAllBets()} className='bg-pink-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full m-auto'>Get all bets</button>
		</main>
	);
}