import { ethers, utils } from 'ethers'
import Token from '../artifacts/contracts/Token.sol/Token.json';
import Poolzi from '../artifacts/contracts/Poolzi.sol/Poolzi.json';

//Testnet
export const CONTRACT_POOL_ADDRESS = '0x1a90Bb1D6252F09B67CC92F0232f70B4891eeB6D';
const CONTRACT_POOL_ABI = Poolzi.abi;

// export const connectToTokenContract = async () => {
//     const apiKey = "vAnfOkm1nmHNfni6esDWcCSkDzRWydM5";
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const contract = new ethers.Contract(
//         CONTRACT_TOKEN_ADDRESS,
//         CONTRACT_TOKEN_ABI,
//         provider
//     );
//     return contract;
// }

export const connectToContract_READONLY = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
        CONTRACT_POOL_ADDRESS,
        CONTRACT_POOL_ABI,
        provider
    );
    console.log("Connect to contract : ", contract.address );
    return contract;
}

export const connectToContract_RW = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        CONTRACT_POOL_ADDRESS,
        CONTRACT_POOL_ABI,
        signer
    );
    return contract;
}

export const getSigner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log('signer: ', signer);
    return signer;
}

export const getAccount = async (cb=null) => {
	try {
		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
		const account = handleAccountsChanged(accounts)
		if (cb) {
			let sliceAcc = `${account.slice(0,8)}...${account.slice(-7, -1)}`;
			cb(sliceAcc);
		}
		// utils.getAddress to return mixCase and not only lowercase..
		return utils.getAddress(account);
	} catch (error) {
		if (error.code === 4001) {
			alert('Please connect to metamask to continue')
		} else {
			console.error(error)
		}
	}
}
export function handleAccountsChanged(accounts) {
	if (accounts.length === 0 ) {
		console.log("Please connect to metamask")
	} else {
		window.ethereum.on("accountsChanged", () => { window.location.reload() });
		return accounts[0];
	}
}


export const getChainNetwork = async () => {
  const windowChain = await window.ethereum.chainId;
	detectChangeNetwork(windowChain)
	switch (windowChain) {
		case '0x1':
			return "Ethereum "+windowChain;
		case '0x3':
			return "Rospten "+windowChain;
		case '0x4':
			return "Rinkeby "+windowChain;
		case '0x5':
			return "Goerli "+windowChain;	
		case '0x89':
			return "Polygon "+windowChain;	
		case '0xa86a':
			return "Avalanche "+windowChain;	
		default:
			return "Unknown network : "+windowChain;
	}
}

export const detectChangeNetwork = (chainId) => {
	ethereum.on('chainChanged', (chainId) => {
		console.log("chaging", chainId);
		// Handle the new chain.
		// Correctly handling chain changes can be complicated.
		// We recommend reloading the page unless you have good reason not to.
		window.location.reload();
	});
}