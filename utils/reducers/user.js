export function account(state, action) {
  switch (action.type) {
    case "SET_ACCOUNT":
      return { ...state, account: action.payload };
    case "SET_KYC": 
      console.log({ ...state, kyc: !state.kyc});
      return { ...state, kyc: !state.kyc}
    case "SET_AMOUNT":
      return { ...state, amountToBuy: action.payload }
    default:
      return state;
  }
}