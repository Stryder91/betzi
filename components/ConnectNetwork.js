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

  return <div className='flex items-center'><Btn text={network} cb={getChainNetwork} /></div>
}