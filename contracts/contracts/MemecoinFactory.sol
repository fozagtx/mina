// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ViralMemecoin is ERC20, Ownable {
    uint256 public constant MAX_TRANSFER_BPS = 100; // 1% anti-whale
    string public sourceTweetId;
    uint256 public aiConfidence;
    uint256 public viewCount;
    bool public limitsEnabled;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 totalSupply_,
        string memory sourceTweetId_,
        uint256 aiConfidence_,
        uint256 viewCount_,
        address owner_
    ) ERC20(name_, symbol_) Ownable(owner_) {
        sourceTweetId = sourceTweetId_;
        aiConfidence = aiConfidence_;
        viewCount = viewCount_;
        limitsEnabled = true;
        _mint(owner_, totalSupply_);
    }

    function _update(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        if (limitsEnabled && from != address(0) && to != address(0)) {
            uint256 maxAmount = (totalSupply() * MAX_TRANSFER_BPS) / 10000;
            require(amount <= maxAmount, "Transfer exceeds 1% max");
        }
        super._update(from, to, amount);
    }

    function removeLimits() external onlyOwner {
        limitsEnabled = false;
    }
}

contract MemecoinFactory is Ownable {
    event TokenCreated(
        address indexed tokenAddress,
        string name,
        string symbol,
        uint256 totalSupply,
        string sourceTweetId,
        uint256 aiConfidence,
        uint256 viewCount,
        uint256 timestamp
    );

    address[] public deployedTokens;

    constructor() Ownable(msg.sender) {}

    function createToken(
        string calldata name_,
        string calldata symbol_,
        uint256 totalSupply_,
        string calldata sourceTweetId_,
        uint256 aiConfidence_,
        uint256 viewCount_
    ) external onlyOwner returns (address) {
        ViralMemecoin token = new ViralMemecoin(
            name_,
            symbol_,
            totalSupply_,
            sourceTweetId_,
            aiConfidence_,
            viewCount_,
            msg.sender
        );

        address tokenAddress = address(token);
        deployedTokens.push(tokenAddress);

        emit TokenCreated(
            tokenAddress,
            name_,
            symbol_,
            totalSupply_,
            sourceTweetId_,
            aiConfidence_,
            viewCount_,
            block.timestamp
        );

        return tokenAddress;
    }

    function getDeployedTokens() external view returns (address[] memory) {
        return deployedTokens;
    }

    function getDeployedTokenCount() external view returns (uint256) {
        return deployedTokens.length;
    }
}
