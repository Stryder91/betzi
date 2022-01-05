const { expect } = require("chai");
const { ethers } = require("hardhat");

function jsInt(bn) {
  // return parseInt(ethers.utils.formatUnits(bn, 0));
  return ethers.utils.formatEther(bn);
}

function toWei (nb) {
  return ethers.utils.parseEther(nb);
}

describe("Test Poolzi", function () {
  let owner;
  let addr1;
  let Poolzi;
  let poolzi;
  beforeEach(async function () {

    [owner, addr1] = await ethers.getSigners();
    Poolzi = await ethers.getContractFactory("Poolzi");
    poolzi = await Poolzi.deploy();
    await poolzi.deployed();
  });

  it("Basics", async function () {
    
    const MATCH_ID = 777;

    console.log("Owner address is : ", owner.address);
    expect(await poolzi.symbol()).to.equal("BBT");

    const sc_balance = jsInt(await poolzi.balanceOf(poolzi.address));
    console.log("Balance of contract : ", sc_balance);

    const ownerBalance = jsInt(await poolzi.balanceOf(owner.address));
    console.log("Balance of owner before bet : ", ownerBalance);
    await poolzi.placeBets(MATCH_ID, 25, toWei('50'));

    const ownerBalance_after = jsInt(await poolzi.balanceOf(owner.address));
    console.log("Balance of owner after bet : ", ownerBalance_after);

    const sc_balance_now = jsInt(await poolzi.balanceOf(poolzi.address));
    console.log("Balance of contract now: ", sc_balance_now);

    const whatPool = await poolzi.getPool(MATCH_ID);
    console.log("Look at the pool : ", jsInt(whatPool));
    
    console.log("-----------------------------");
    console.log("Cancel the Bet");
    await poolzi.cancelBet(MATCH_ID);
    console.log("Balance of owner after cancel : ", jsInt(await poolzi.balanceOf(owner.address)));

    console.log("Balance of contract now: ", jsInt(await poolzi.balanceOf(poolzi.address)));

    console.log("Look at the pool at the end: ", jsInt(await poolzi.getPool(MATCH_ID)));
  });

  it("Transfer to addr1 some pennies", async function () {
    console.log("--------- Transfer some pennies ----------------");
    const AMOUNT_TO_TRANSFER = '42';
    const ownerBalance = jsInt(await poolzi.balanceOf(owner.address));
    console.log("Balance of owner before transfer : ", ownerBalance);

    await poolzi.transfer(addr1.address, toWei(AMOUNT_TO_TRANSFER));
    const addr1Bal = jsInt(await poolzi.balanceOf(addr1.address));
    console.log("Balance of owner before transfer : ", addr1Bal);

    const ownerBalance_after = jsInt(await poolzi.balanceOf(owner.address));
    console.log("Balance of owner before transfer : ", ownerBalance_after);
  });
});
