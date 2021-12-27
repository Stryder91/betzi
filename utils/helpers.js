import { ethers } from "ethers";

export const jsInt = (bn) => {
    return parseInt(ethers.utils.formatUnits(bn, 0));
}