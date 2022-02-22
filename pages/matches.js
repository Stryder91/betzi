import { useEffect, useState } from 'react'

import {
  connectToContract_READONLY,
  getAccount,
  connectToContract_RW,
} from '../utils/ethers'
import { formatDate, jsInt, toWei } from '../utils/helpers'

import { getPool_forAMatch, setUpMetadata } from '../utils/pool_contract';
import { Btn } from '../components/Button';
import { BetFrame } from '../components/BetFrame';
import { Card } from '../components/Card';
import axios from 'axios';

export default function AllMatches() {

  const [matches, setAllMatches] = useState([]);

  const [supply, _setSupply] = useState(0);
  const [balance, _setBalance] = useState(0);
  const [contract_balance, _setSCBalance] = useState(0);

  const [betAmount, setBettingAmount] = useState({
    matchId: 0,
    teamId: 0, 
    amount: 0
  });

  useEffect(async () => {
    setUpMetadata(_setSupply, _setBalance, _setSCBalance)
    const allMatches = await axios.get('/api/matches');
    // _setPoolInMatch(allMatches);
  }, []);

  // 1 
  async function _getPoolandShare(match_id) {
    const contract = await connectToContract_READONLY();
    const poolandShare = {pool: 0, share: 0};
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
  
  async function _setPoolInMatch(matchfromdb) {
    const allMatches = matchfromdb.data;
    const matchesLg = allMatches.length;
    for (let i=0; i<matchesLg; i++) {
      const myPaS = await _getPoolandShare(allMatches[i].id);
      allMatches[i].poolAmount = myPaS.pool;
      allMatches[i].myShare =  myPaS.share;
    }
    console.log("allMatches",allMatches);
    setAllMatches(allMatches.data);
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

  // Navi : #3874
  async function _placeBet(match_id, team_id) {
    const contract = await connectToContract_RW();
    console.log("COUCOU", team_id);
    if (betAmount.teamId && betAmount.matchId == match_id && betAmount.amount > 0){
      await contract.placeBets(match_id, team_id, toWei(betAmount.amount));
    } else {
      console.log("Maybe wrong match id ?");
      new Error("Problem placing bet : amount undefined or matchId doesn't match")
    }
  }

	return(
		<main className="main">
			<p>Total supply is : {supply}</p>
			<p>My balance is : {balance} </p>
      <p>Contract balance is : {contract_balance}</p>
      <div className='flex flex-wrap justify-center'>
      {
        matches && matches.length > 0 ?
        matches.map((m,i) => {
          return <div key={i} className='mx-4 lg:w-1/3'>
            <Card 
              title={`${m.team1.name} vs ${m.team2.name}`} 
              date={`Start : ${formatDate(m.date)}`}
              id={m.id}
              format={m.format}
              pool={m.poolAmount}
              share={m.myShare}
              cancel={_cancelBet}
              >
              <BetFrame 
                m={m}
                OneOrTwo={1}
                onChangeCb={e => setBettingAmount({...betAmount, matchId:m.id, teamId: m.team1.id, amount: e.target.value})}
                onSubmitCb={() => _placeBet(m.id, m.team1.id, 1)}
              />
              <BetFrame 
                m={m}
                OneOrTwo={2}
                onChangeCb={e => setBettingAmount({...betAmount, matchId:m.id, teamId: m.team2.id, amount: e.target.value})}
                onSubmitCb={() => _placeBet(m.id, m.team2.id, 2)}
              />
            </Card>
          </div>
        })
        : 'Loading... '
      }
      </div>
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