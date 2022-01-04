import { ethers } from "ethers";

export const jsInt = (bn) => {
  return parseInt(ethers.utils.formatUnits(bn, 0));
}

export const formatDate = timestamp => {
  let humanDate = new Intl.DateTimeFormat('fr-FR', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
  }).format(timestamp);
  return humanDate;
}

export const amountToPercentage  = (pool, amount) => `${(100*amount / pool).toFixed(2)}% (${amount} BBT)`; 