import { ethers } from 'ethers'
import Token from '../artifacts/contracts/Token.sol/Token.json';

const CONTRACT_ADDRESS = '0x34eeb86c3a2e017A897b173929105FbA4E24639c';
const CONTRACT_ABI = Token.abi;

export const connectToContract = async () => {
    const apiKey = "5bH2W-W-KBv0yLSF1VOVzclNsm1RoiVt";
    const provider = new ethers.providers.AlchemyProvider("rinkeby", apiKey);
    const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
    );
    return contract;
}

export const getProviderSigned = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
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