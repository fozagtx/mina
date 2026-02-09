import { expect } from "chai";
import { ethers } from "hardhat";
import { MemecoinFactory, ViralMemecoin } from "../typechain-types";

describe("MemecoinFactory", function () {
  let factory: MemecoinFactory;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("MemecoinFactory");
    factory = await Factory.deploy();
    await factory.waitForDeployment();
  });

  describe("Deployment", function () {
    it("should set the correct owner", async function () {
      expect(await factory.owner()).to.equal(owner.address);
    });

    it("should start with zero deployed tokens", async function () {
      expect(await factory.getDeployedTokenCount()).to.equal(0);
    });
  });

  describe("createToken", function () {
    const tokenName = "DogeVibes";
    const tokenSymbol = "DVIBE";
    const totalSupply = ethers.parseEther("1000000000"); // 1B tokens
    const tweetId = "1234567890";
    const aiConfidence = 85n;
    const viewCount = 5000000n;

    it("should create a new token", async function () {
      const tx = await factory.createToken(
        tokenName,
        tokenSymbol,
        totalSupply,
        tweetId,
        aiConfidence,
        viewCount
      );
      await tx.wait();

      expect(await factory.getDeployedTokenCount()).to.equal(1);
    });

    it("should emit TokenCreated event", async function () {
      await expect(
        factory.createToken(
          tokenName,
          tokenSymbol,
          totalSupply,
          tweetId,
          aiConfidence,
          viewCount
        )
      ).to.emit(factory, "TokenCreated");
    });

    it("should mint total supply to factory owner", async function () {
      const tx = await factory.createToken(
        tokenName,
        tokenSymbol,
        totalSupply,
        tweetId,
        aiConfidence,
        viewCount
      );
      await tx.wait();

      const tokenAddr = await factory.deployedTokens(0);
      const token = await ethers.getContractAt("ViralMemecoin", tokenAddr);

      expect(await token.balanceOf(owner.address)).to.equal(totalSupply);
    });

    it("should store on-chain metadata", async function () {
      const tx = await factory.createToken(
        tokenName,
        tokenSymbol,
        totalSupply,
        tweetId,
        aiConfidence,
        viewCount
      );
      await tx.wait();

      const tokenAddr = await factory.deployedTokens(0);
      const token = await ethers.getContractAt("ViralMemecoin", tokenAddr);

      expect(await token.sourceTweetId()).to.equal(tweetId);
      expect(await token.aiConfidence()).to.equal(aiConfidence);
      expect(await token.viewCount()).to.equal(viewCount);
    });

    it("should only allow owner to create tokens", async function () {
      await expect(
        factory
          .connect(addr1)
          .createToken(
            tokenName,
            tokenSymbol,
            totalSupply,
            tweetId,
            aiConfidence,
            viewCount
          )
      ).to.be.revertedWithCustomError(factory, "OwnableUnauthorizedAccount");
    });

    it("should track multiple deployed tokens", async function () {
      await factory.createToken(tokenName, tokenSymbol, totalSupply, tweetId, aiConfidence, viewCount);
      await factory.createToken("PepeCash", "PEPEC", totalSupply, "999", 90n, 8000000n);

      expect(await factory.getDeployedTokenCount()).to.equal(2);
      const tokens = await factory.getDeployedTokens();
      expect(tokens.length).to.equal(2);
    });
  });

  describe("ViralMemecoin anti-whale", function () {
    let token: ViralMemecoin;
    const totalSupply = ethers.parseEther("1000000000");

    beforeEach(async function () {
      const tx = await factory.createToken(
        "TestCoin",
        "TEST",
        totalSupply,
        "123",
        80n,
        1000000n
      );
      await tx.wait();

      const tokenAddr = await factory.deployedTokens(0);
      token = await ethers.getContractAt("ViralMemecoin", tokenAddr) as ViralMemecoin;
    });

    it("should enforce 1% max transfer", async function () {
      const maxTransfer = totalSupply / 100n; // 1%
      const overMax = maxTransfer + 1n;

      await expect(
        token.transfer(addr1.address, overMax)
      ).to.be.revertedWith("Transfer exceeds 1% max");
    });

    it("should allow transfers at exactly 1%", async function () {
      const maxTransfer = totalSupply / 100n;
      await expect(token.transfer(addr1.address, maxTransfer)).to.not.be
        .reverted;
    });

    it("should allow owner to remove limits", async function () {
      await token.removeLimits();
      expect(await token.limitsEnabled()).to.equal(false);

      const bigTransfer = totalSupply / 2n;
      await expect(token.transfer(addr1.address, bigTransfer)).to.not.be
        .reverted;
    });

    it("should only allow token owner to remove limits", async function () {
      await expect(
        token.connect(addr1).removeLimits()
      ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    });
  });
});
