import { ethers, utils } from 'ethers'
import Token from '../artifacts/contracts/Token.sol/Token.json';
import Poolzi from '../artifacts/contracts/Poolzi.sol/Poolzi.json';

//Testnet
export const CONTRACT_POOL_ADDRESS = '0xd5E440308343Ed7ab8cf6FF06170D7f078ADEF06';
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

export const getAccount = async () => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
        const account = handleAccountsChanged(accounts)
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