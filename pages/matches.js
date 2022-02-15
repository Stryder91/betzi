import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

import {
  connectToContract_READONLY,
  getAccount,
  connectToContract_RW,
} from '../utils/ethers'
import { amountToPercentage, formatDate, jsInt, toWei } from '../utils/helpers'

// import allMatchesData_ from '../utils/data/matches.json';
import { getMyBalance, getPool_forAMatch, getSCBalance, getTotalSupply } from '../utils/pool_contract';
import { Btn } from '../components/Button';
import { BetFrame } from '../components/BetFrame';
import { Card } from '../components/Card';
import axios from 'axios';

export default function AllMatches() {

  const [matches, setAllMatches] = useState([]);
	const [contract, _setContract] = useState();
  // const [sgContract, _setSgContract] = useState();
  const [supply, _setSupply] = useState(0);
  const [balance, _setBalance] = useState(0);
  const [contract_balance, _setSCBalance] = useState(0);

  const [betAmount, setBettingAmount] = useState({
    matchId: 0,
    team1: 0,
    team2: 0
  });

  useEffect(async () => {
    const allMatches = await axios.get('/api/matches');
    console.log("allMatches", allMatches);
    const contract = await connectToContract_READONLY();
    _setContract(contract);
    _setSupply(await getTotalSupply(contract));
    _setBalance(await getMyBalance(contract));
    _setSCBalance(await getSCBalance(contract));
    // _setPoolInMatch()
  }, []);

  // 1 
  async function _getPoolandShare(match_id) {
    const poolandShare = {pool: 0, share: 0};
    const contract = await connectToContract_READONLY();
    const actualPool = await getPool_forAMatch(contract, match_id);
    const actualShare = await _getmyShareInPool(contract, match_id, actualPool);
    poolandShare =  {
      pool: actualPool,
      share: actualShare,
    }
    return poolandShare;
  }

  // 2
  async function _getmyShareInPool(contract, match_id, pool) {
    const allBetsForAMatch = await contract.getBet(match_id);
    let myBets = 0;
    const account = await getAccount();
    allBetsForAMatch.map(bet => {
      if (bet.better == account) {
        myBets += jsInt(bet.amount);
      }
    });
    return myBets;
  }

  async function _setPoolInMatch() {
    const allMatches = allMatchesData_;
    const matchesLg = allMatches.length;
    for (let i=0; i<matchesLg; i++) {
      const myPaS = await _getPoolandShare(allMatches[i].id);
      allMatches[i].poolAmount = myPaS.pool;
      allMatches[i].myShare =  myPaS.share;
    }
    setAllMatches(allMatches);
  }
  async function _cancelBet(match_id) {
    const contract = await connectToContract_RW();
    const cancelling = await contract.cancelBet(match_id);
    // cancelling.wait();
    console.log("Cancelling", cancelling);
    // try {
    // } catch(e) {
    //   console.log("Error", e);
    // }
  }

  async function _testDeposit() {
    const contract = await connectToContract_RW();
    const transaction = jsInt(await contract.balanceOf('0x4aa715AF47705560d442E08fe8c3a81eF6F8949f'));
  }

  // Navi : #3874
  async function _placeBet(match_id, team_id, team_1or2) {
    const contract = await connectToContract_RW();
    if (betAmount.team1 && betAmount.matchId == match_id && team_1or2 == 1){
      await contract.placeBets(match_id, team_id, toWei(betAmount.team1));
    } else if (betAmount.team2 && betAmount.matchId == match_id && team_1or2 == 2){
      await contract.placeBets(match_id, team_id, toWei(betAmount.team2));
    }else {
      console.log("Maybe wrong match id ?");
      new Error("Problem placing bet : amount undefined or matchId doesn't match")
    }
  }

	return(
		<main className={styles.main}>
			<p>Total supply is : {supply}</p>
			<p>My balance is : {balance} </p>
      <p>Contract balance is : {contract_balance}</p>
        {
          matches && matches.length > 0 ?
          matches.map(m => {
            return <div>
              <Card 
                title={`${m.team1.name} vs ${m.team2.name}`} 
                date={`Start : ${formatDate(m.date)}`}
                id={m.id}
                format={m.format}
                >
                <BetFrame 
                  m={m}
                  OneOrTwo={1}
                  onChangeCb={e => setBettingAmount({...betAmount, matchId:m.id, team1: e.target.value})}
                  onSubmitCb={() => _placeBet(m.id, m.team1.id, 1)}
                />
                <BetFrame 
                  m={m}
                  OneOrTwo={2}
                  onChangeCb={e => setBettingAmount({...betAmount, matchId:m.id, team2: e.target.value})}
                  onSubmitCb={() => _placeBet(m.id, m.team2.id, 2)}
                />
              </Card>
              <div className='m-auto text-center'>
                <p> Pool : {m.poolAmount ? m.poolAmount : 0} and my share : {m.myShare ? amountToPercentage(m.poolAmount, m.myShare) : 0}</p>
                <Btn text="Cancel my bet" color="green" cb={() => _cancelBet(m.id)}/>
              </div>
            </div>
          })
          : 'Loading... '
        }
		</main>
	);
}

{/* <div className='bet-frame'>
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bet1">
  {m.team1.name}
  </label>
  <input
    onChange={e => setBettingAmount({...betAmount, matchId:m.id, team1: e.target.value})}
    className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bet1" type="number" placeholder="0"/>
  <Btn text="Bet" color="green" cb={() => _placeBet(m.id, m.team1.id, 1)}/>
</div>
</div> */}
    // const contract = await connectToContract_READONLY();
    // const allPoolsBN = await contract.getAllPools();
    // const allPools = allPoolsBN.map(bn => jsInt(bn));
    // const allPoolsLg = allPools.length;