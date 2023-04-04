const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("TokenERC1155 Contract", function () {
  async function deployOneContract() {
    const TokenERC1155 = await hre.ethers.getContractFactory("TokenERC1155");
    const tokenERC1155 = await TokenERC1155.deploy();
  
    await tokenERC1155.deployed();
  
    console.log("tokenERC1155 deployed to:", tokenERC1155.address);
  
  
    const [addr1, addr2] = await ethers.getSigners();
    return { tokenERC1155, addr1, addr2 };
  }

  it("should be able to mint and burn", async function () {
    console.log('------------------------------------------')

    const {tokenERC1155, addr1, addr2 } = await loadFixture(deployOneContract);
    //mint
    await tokenERC1155.connect(addr1).mint('http://www.mytokenlocation.com',addr2.address,100,"0x");
    const id=await tokenERC1155.getTokenIdCounter()
    expect(await tokenERC1155.balanceOf(addr2.address,id)).to.equal(100);
    //burn
    await tokenERC1155.connect(addr2).burn(addr2.address,id,50)
    expect(await tokenERC1155.balanceOf(addr2.address,id)).to.equal(50);
  });
});