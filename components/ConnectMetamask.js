import { useState } from 'react'
import { getAccount } from '../utils/ethers';
import { Btn } from './Button'

export const ConnectMetamask = () => {
  const [account, setAccount] = useState('Connect a wallet');
  return(
    <div>
			<Btn text={account} cb={() => getAccount(setAccount)} />
    </div>
  );
}