
import { utils } from 'ethers'
import Head from 'next/head'
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
import allMatchesData_ from '../utils/data/matches.json';

export default function AllMatches() {

  const [matches, setAllMatches] = useState([]);
	const [contract, setContract] = useState();
  const [supply, setSupply] = useState(0);
  const [balance, setBalance] = useState(0);
  const [bet, setBet] = useState({
    currentPool: 0,
    myShare: 0
  });
  const [currentPool, setCurrentPool] = useState(0);

  const [betAmount, setBettingAmount] = useState({
    matchId: 0,
    team1: 0,
    team2: 0
  })
  const [bet1, setBet1] = useState(0);
  const [bet2, setBet2] = useState(0);

  useEffect(async () => {
    const contract = await connectToTokenContract();
    setContract(contract);
    _getSupply(contract);
    _getBalance(contract);
    // getMatches();
    // getMatches();
    // Hello();
    // console.log("MATCHES", matches);
    // setAllMatches(allMatchesData_)
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
    // myBets = `${(pool / myBets).toFixed(2)}%`; 
    console.log("My SHARE", myBets, );
    return myBets;
  }

  async function _setPoolInMatch() {
    const allMatches = allMatchesData_;
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

  async function _testDeposit() {
    const contract = await getProviderSigned_pool();
    const transaction = await contract.depositTokenPool('50');
    await transaction.wait();
  }

  // Navi : #3874
  async function _placeBet(match_id, team_id, team_1or2) {
    const contract = await getProviderSigned_pool();
    if (betAmount.team1 && betAmount.matchId == match_id && team_1or2 == 1){
      const placeBet = await contract.placeBets(match_id, team_id, betAmount.team1);
    } else if (betAmount.team2 && betAmount.matchId == match_id && team_1or2 == 2){
      const placeBet = await contract.placeBets(match_id, team_id, betAmount.team2);
    }else {
      console.log("Maybe wrong match id ?");
    }
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
      <button onClick={() => _testDeposit()}>Test Deposit</button>
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
                    <input 
                      onChange={e => setBettingAmount({...betAmount, matchId:m.id, team1: e.target.value})} 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bet1" type="number" placeholder="0"/>
                    <button onClick={() => _placeBet(m.id, m.team1.id, 1)} className='bg-green-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full m-auto'>Bet</button>
                  </div>
                </div>
                <div className='card'>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bet2">
                    {m.team2.name}
                    </label>
                    <input 
                      onChange={e => setBettingAmount({...betAmount, matchId:m.id, team2: e.target.value})} 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bet2" type="number" placeholder="0"/>
                    <button onClick={() => _placeBet(m.id, m.team2.id, 2)} className='bg-green-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full m-auto'>Bet</button>
                  </div>
                </div>
              </div>
              <div>
                <p>Match id : {m.id}</p>
                <p>Format: {m.format}</p>
              </div>
              <div className='m-auto text-center'>
                <p> Pool : {m.poolAmount ? m.poolAmount : 0} and my share : {m.myShare ? amountToPercentage(m.poolAmount, m.myShare) : 0}</p>
                <button onClick={() => _placeBet()} className='bg-green-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full m-auto'>Bet</button>
                <button onClick={() => _getAllBets()} className='bg-pink-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full m-auto'>Get all bets</button>
                <button onClick={() => _getmyShareInPool()} className='bg-green-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full m-auto'>get Share</button>
                <button onClick={() => _setPoolInMatch(m.id)} className='bg-yellow-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full m-auto'>get Pool</button>
              </div>
            </div> 
          })
          : null
        }
		</main>
	);
}

    // const contract = await connectToPoolContract();
    // const allPoolsBN = await contract.getAllPools();
    // const allPools = allPoolsBN.map(bn => jsInt(bn));
    // const allPoolsLg = allPools.length;