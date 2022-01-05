import { ethers, utils } from 'ethers'
import Token from '../artifacts/contracts/Token.sol/Token.json';
import Poolzi from '../artifacts/contracts/Poolzi.sol/Poolzi.json';

// Testnet
// const CONTRACT_TOKEN_ADDRESS = '0x959e2a51DB0b33d586A1Ed5584406E0d0754D91c';
// const CONTRACT_TOKEN_ABI = Token.abi;

//Testnet
export const CONTRACT_POOL_ADDRESS = '0xAA638624184D8CA885E99D67c6707c3c5D3cA507';
const CONTRACT_POOL_ABI = Poolzi.abi;

export const connectToTokenContract = async () => {
    const apiKey = "5bH2W-W-KBv0yLSF1VOVzclNsm1RoiVt";
    const provider = new ethers.providers.AlchemyProvider("rinkeby", apiKey);
    const contract = new ethers.Contract(
        CONTRACT_TOKEN_ADDRESS,
        CONTRACT_TOKEN_ABI,
        provider
    );
    return contract;
}

export const connectToPoolContract = async () => {
    const apiKey = "5bH2W-W-KBv0yLSF1VOVzclNsm1RoiVt";
    const provider = new ethers.providers.AlchemyProvider("rinkeby", apiKey);
    const contract = new ethers.Contract(
        CONTRACT_POOL_ADDRESS,
        CONTRACT_POOL_ABI,
        provider
    );
    return contract;
}

export const getProviderSigned_token = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        CONTRACT_TOKEN_ADDRESS,
        CONTRACT_TOKEN_ABI,
        signer
    );
    return contract;
}

export const getProviderSigned_pool = async () => {
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