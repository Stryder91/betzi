import { ethers } from "ethers";

export const jsInt = bn => {
  // return parseInt(ethers.utils.formatUnits(bn, 0));
  return ethers.utils.formatEther(bn);
}

export const toWei = nb => {
  return ethers.utils.parseEther(nb);
}

export const formatTimestamp = timestamp => {
  let humanDate = new Intl.DateTimeFormat('fr-FR', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
  }).format(timestamp);
  return humanDate;
}

export const formatDate = longdate => {
  let date = new Date(longdate);
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let dt = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes(); 

  if (dt < 10) { dt = '0' + dt }
  if (month < 10) { month = '0' + month }
  if (min == 0) { min = '00'}
  const finaldate = hour+':'+min+' - '+dt+'-' + month + '-'+year
  return finaldate
}

export const amountToPercentage  = (pool, amount) => `${(100*amount / pool).toFixed(2)}% (${amount} BBT)`; 