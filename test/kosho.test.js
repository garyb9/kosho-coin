
const { expect } = require("chai");
const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'
const EVM_REVERT = 'VM Exception while processing transaction: revert'
// global.artifacts = artifacts;
// global.web3 = web3;

const { ethers } = require("hardhat");

describe("KoshoToken", function () {

  let Token;
  let kosho;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let totalSupply = 10000000

  beforeEach(async () => {
    Token = await ethers.getContractFactory("KoshoToken");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    kosho = await Token.deploy(totalSupply);
    await kosho.deployed();
  })


  // You can nest describe calls to create subsections.
  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      expect(await kosho.owner()).to.equal(owner.address);
    });

    it("Check the right name", async function () {
      expect(await kosho.name()).to.equal('Kosho');
    });

    it("Check the right symbol", async function () {
      expect(await kosho.symbol()).to.equal('KOSH');
    });

    it("Check the right decimals", async function () {
      expect(await kosho.decimals()).to.equal(18);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await kosho.balanceOf(owner.address);
      expect(await kosho.totalSupply()).to.equal(ownerBalance);
      expect(await kosho.totalSupply()).to.equal(totalSupply);
    });
  });

});



// contract('Kosho', ([deployer, user]) => {
//   let kosho

//   beforeEach(async () => {
//     const Kosho = await ethers.getContractFactory("Kosho");
//     const kosho = await Kosho.deploy();
//     await kosho.deployed();
//     // await kosho.passMinterRole(dbank.address, {from: deployer})
//   })

  // describe('testing dtoken contract...', () => {
  //   describe('success', () => {
  //     it('checking dtoken name', async () => {
  //       expect(await dtoken.name()).to.be.eq('dToken')
  //     })

  //     it('checking dtoken symbol', async () => {
  //       expect(await dtoken.symbol()).to.be.eq('DTKN')
  //     })

  //     it('checking dtoken initial total supply', async () => {
  //       expect(Number(await dtoken.totalSupply())).to.eq(0)
  //     })

  //     it('dBank should have dToken minter role', async () => {
  //       expect(await dtoken.minter()).to.eq(dbank.address)
  //     })
  //   })

  //   describe('failure', () => {
  //     it('passing minter role should be rejected', async () => {
  //       await dtoken.passMinterRole(user, {from: deployer}).should.be.rejectedWith(EVM_REVERT)
  //     })

  //     it('dtokens minting should be rejected', async () => {
  //       await dtoken.mint(user, '1', {from: deployer}).should.be.rejectedWith(EVM_REVERT) //unauthorized minter
  //     })
  //   })
  // })

  // describe('testing deposit...', () => {
  //   let balance

  //   describe('success', () => {
  //     beforeEach(async () => {
  //       await dbank.deposit({value: 10**16, from: user}) //0.01 ETH
  //     })

  //     it('balance should increase', async () => {
  //       expect(Number(await dbank.etherBalanceOf(user))).to.eq(10**16)
  //     })

  //     it('deposit time should > 0', async () => {
  //       expect(Number(await dbank.depositStart(user))).to.be.above(0)
  //     })

  //     it('deposit status should eq true', async () => {
  //       expect(await dbank.isDeposited(user)).to.eq(true)
  //     })
  //   })

  //   describe('failure', () => {
  //     it('depositing should be rejected', async () => {
  //       await dbank.deposit({value: 10**15, from: user}).should.be.rejectedWith(EVM_REVERT) //to small amount
  //     })
  //   })
  // })

  // describe('testing withdraw...', () => {
  //   let balance

  //   describe('success', () => {

  //     beforeEach(async () => {
  //       await dbank.deposit({value: 10**16, from: user}) //0.01 ETH

  //       await wait(2) //accruing interest

  //       balance = await web3.eth.getBalance(user)
  //       await dbank.withdraw({from: user})
  //     })

  //     it('balances should decrease', async () => {
  //       expect(Number(await web3.eth.getBalance(dbank.address))).to.eq(0)
  //       expect(Number(await dbank.etherBalanceOf(user))).to.eq(0)
  //     })

  //     it('user should receive ether back', async () => {
  //       expect(Number(await web3.eth.getBalance(user))).to.be.above(Number(balance))
  //     })

  //     it('user should receive proper amount of interest', async () => {
  //       //time synchronization problem make us check the 1-3s range for 2s deposit time
  //       balance = Number(await dtoken.balanceOf(user))
  //       expect(balance).to.be.above(0)
  //       expect(balance%interestPerSecond).to.eq(0)
  //       expect(balance).to.be.below(interestPerSecond*4)
  //     })

  //     it('depositer data should be reseted', async () => {
  //       expect(Number(await dbank.depositStart(user))).to.eq(0)
  //       expect(Number(await dbank.etherBalanceOf(user))).to.eq(0)
  //       expect(await dbank.isDeposited(user)).to.eq(false)
  //     })
  //   })

  //   describe('failure', () => {
  //     it('withdrawing should be rejected', async () =>{
  //       await dbank.deposit({value: 10**16, from: user}) //0.01 ETH
  //       await wait(2) //accruing interest
  //       await dbank.withdraw({from: deployer}).should.be.rejectedWith(EVM_REVERT) //wrong user
  //     })
  //   })
  // })
// })