import { useContext, useEffect, useState } from 'react';
import { getAccount, getChainNetwork } from '../utils/ethers';
import { Context } from '../utils/context';

import { Btn } from './Button'

export const ConnectNetwork = () => {
  const [network, _setNetwork] = useState('No network');
  
  const { state, dispatch } = useContext(Context);

  useEffect( async () => {
    const network = await getChainNetwork();
    _setNetwork(network)
  }, []);

  const _connectToMM = async () => {
    if (!state.account) {
      const net = await getAccount(_setAccount);
      dispatch({
        type: "SET_NETWORK",
        payload: net,
      });
    } 
  }
  return <div className='flex items-center'><Btn text={network} cb={getChainNetwork} /></div>
}