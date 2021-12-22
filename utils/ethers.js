import { ethers } from 'ethers'
import Token from '../artifacts/contracts/Token.sol/Token.json';
import Poolzi from '../artifacts/contracts/Poolzi.sol/Poolzi.json';

const CONTRACT_TOKEN_ADDRESS = '0x34eeb86c3a2e017A897b173929105FbA4E24639c';
const CONTRACT_TOKEN_ABI = Token.abi;

const CONTRACT_POOL_ADDRESS = '0x9e0d24375959d40484d37be29A54E84f3ef6a4d3';
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

export const getProviderSigned = async () => {
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
        return account;
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