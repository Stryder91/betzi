import { useContext, useEffect, useState } from 'react';
import { getAccount } from '../utils/ethers';
import { Context } from '../utils/context';

import { Btn } from './Button'

export const ConnectMetamask = () => {
  const [account, _setAccount] = useState('Connect a wallet');
  
  const { state, dispatch } = useContext(Context);

  useEffect( async () => {
   _connectToMM()
  }, []);

  const _connectToMM = async () => {
    if (!state.account) {
      const acc = await getAccount(_setAccount);
      dispatch({
        type: "SET_ACCOUNT",
        payload: acc,
      });
    } 
  }

  return <div className='flex items-center'><Btn text={account} cb={_connectToMM} /></div>
}