import { useEffect, useState } from 'react'

import {
  connectToContract_READONLY,
  getAccount,
} from '../utils/ethers'
import { formatDate, jsInt, toWei } from '../utils/helpers'

import { getPool_forAMatch, setUpMetadata } from '../utils/pool_contract';
import { Card } from '../components/Card';
import axios from 'axios';

export default function AllMatches() {

  const [matches, _setAllMatches] = useState([]);
  // const [sgContract, _setSgContract] = useState();
  const [supply, _setSupply] = useState(0);
  const [balance, _setBalance] = useState(0);
  const [contract_balance, _setSCBalance] = useState(0);

  useEffect(async () => {
    const allResults = await axios.get('/api/results');
    _setPoolInMatch(allResults);
    setUpMetadata(_setSupply, _setBalance, _setSCBalance);
  }, []);

  // 0
  async function _setPoolInMatch(allMatches) {
    const matchesLg = allMatches.length;
    for (let i=0; i<matchesLg; i++) {
      const myPaS = await _getPoolandShare(allMatches[i].id);
      allMatches[i].poolAmount = myPaS.pool;
      allMatches[i].myShare =  myPaS.share;
    }
    console.log("allMatches",allMatches.data);
    _setAllMatches(allMatches.data);
  }

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


	return(
		<main className="main">
			<p>Total supply is : {supply}</p>
			<p>My balance is : {balance} </p>
      <p>Contract balance is : {contract_balance}</p>
      <div className='flex flex-wrap'>
      {
        matches && matches.length > 0 ?
        matches.map((m,i) => {
          return <div key={i} className='mx-5'>
            <Card 
              title={`${m.team1.name} vs ${m.team2.name}`} 
              date={`Start : ${formatDate(m.date)}`}
              id={m.id}
              format={m.format}
              pool={m.poolAmount}
              share={m.myShare}
              >
              <div className='flex items-center'>
                <div className='flex items-center'>
                  <img className='logo-team' src={m.team1.logo} alt={`${m.team1.name} logo`} />
                  <p className='font-bold px-4'>{m.result.team1} </p>
                </div>
                - 
                <div className='flex items-center'>
                  <p className='font-bold px-4'>{m.result.team1} </p>
                  <img className='logo-team' src={m.team2.logo} alt={`${m.team2.name} logo`} />
                </div>
              </div>
            </Card>
          </div>
        })
        : 'Loading... '
      }
      </div>
		</main>
	);
}