const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT Contract Interaction", function () {

  let nfttoken;
  let kncnft;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    const NFTToken = await ethers.getContractFactory("kncxtoken");
    [owner, addr1, addr2] = await ethers.getSigners();
    // deploy with 1000000 initial tokens
    nfttoken = await NFTToken.deploy("0xD3C21BCECCEDA1000000");
    await nfttoken.deployed();
    const KNCNFT = await ethers.getContractFactory("KNCNFT");
    kncnft = await KNCNFT.deploy(nfttoken.address);
    await kncnft.deployed();
  });
  it("Should add NFT and mint a new NFT to the sender. Checks the balance of msg.sender's ERC721 before and after buying", async function () {  

    await nfttoken.transfer(addr1.address,"0x3635C9ADC5DEA00000");

    await nfttoken.connect(addr1).approve(kncnft.address,"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

    const nftBalanceBefore = parseInt(await kncnft.balanceOf(addr1.address));
    // cost to buy is 1000 tokens
    const txBuyNFT = await kncnft.connect(addr1).buyNFT(1);
    const nftBalanceAfter = parseInt(await kncnft.balanceOf(addr1.address));
    expect(nftBalanceAfter).to.equal(nftBalanceBefore+1);
  });

  it("Should fail to buy an NFT if the balance is insufficient for the tier", async function(){
    await nfttoken.transfer(addr1.address,"0x3635C9ADC5DEA00000");

    await nfttoken.connect(addr1).approve(kncnft.address,"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

    await expect( kncnft.connect(addr1).buyNFT(2)).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });
  
  it("Should fail to buy an NFT if the tier selected is out of range", async function(){
    await nfttoken.transfer(addr1.address,"0x3635C9ADC5DEA00000");

    await nfttoken.connect(addr1).approve(kncnft.address,"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

    await expect( kncnft.connect(addr1).buyNFT(4)).to.be.revertedWith("The tier you have selected is out of range");
  });

  it("Should receive an NFT when transferred to receiver and the receiver should be the owner of the NFT", async function(){
    await nfttoken.transfer(addr1.address,"0x3635C9ADC5DEA00000");

    await nfttoken.connect(addr1).approve(kncnft.address,"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    await kncnft.connect(addr1).buyNFT(1);
    
    balanceOfAddr2Before = parseInt(await kncnft.balanceOf(addr2.address));
    await kncnft.connect(addr1).transferFrom(addr1.address,addr2.address,0);
    balanceOfAddr2After = parseInt(await kncnft.balanceOf(addr2.address));
    expect(balanceOfAddr2After).to.equal(balanceOfAddr2Before+1);
    expect(await kncnft.ownerOf(0)).to.be.equal(addr2.address);
  });

  it("Should not be able to transfer an NFT if it does not belong to the user", async function(){
    await nfttoken.transfer(addr1.address,"0x3635C9ADC5DEA00000");

    await nfttoken.connect(addr1).approve(kncnft.address,"0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    await kncnft.connect(addr1).buyNFT(1);
    
    balanceOfAddr2Before = parseInt(await kncnft.balanceOf(addr2.address));
    await expect( kncnft.connect(addr2).transferFrom(addr1.address,addr2.address,0)).to.be.revertedWith("ERC721: transfer caller is not owner nor approved");
    balanceOfAddr2After = parseInt(await kncnft.balanceOf(addr2.address));
    expect(balanceOfAddr2After).to.equal(balanceOfAddr2Before);
    expect(await kncnft.ownerOf(0)).to.equal(addr1.address);
  });

});

