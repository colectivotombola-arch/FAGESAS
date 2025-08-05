// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title FageCoin
 * @dev Advanced ERC20 token for the FAGESAS ecosystem
 * Features:
 * - Burnable tokens
 * - Pausable functionality
 * - Owner controls
 * - Premium features integration
 */
contract FageCoin is ERC20, ERC20Burnable, Ownable, Pausable {
    
    uint256 public constant MAX_SUPPLY = 1000000000 * (10 ** 18); // 1 billion tokens
    uint256 public constant INITIAL_SUPPLY = 100000000 * (10 ** 18); // 100 million tokens
    
    // Premium features tracking
    mapping(address => bool) public premiumUsers;
    mapping(address => uint256) public stakingBalances;
    mapping(address => uint256) public stakingRewards;
    
    // Events
    event PremiumStatusChanged(address indexed user, bool isPremium);
    event TokensStaked(address indexed user, uint256 amount);
    event TokensUnstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    
    constructor() ERC20("FageCoin", "FAGE") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
    
    /**
     * @dev Mint new tokens (only owner)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds maximum supply");
        _mint(to, amount);
    }
    
    /**
     * @dev Set premium status for user (only owner)
     */
    function setPremiumStatus(address user, bool isPremium) external onlyOwner {
        premiumUsers[user] = isPremium;
        emit PremiumStatusChanged(user, isPremium);
    }
    
    /**
     * @dev Stake tokens for rewards
     */
    function stake(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        _transfer(msg.sender, address(this), amount);
        stakingBalances[msg.sender] += amount;
        
        emit TokensStaked(msg.sender, amount);
    }
    
    /**
     * @dev Unstake tokens
     */
    function unstake(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(stakingBalances[msg.sender] >= amount, "Insufficient staked balance");
        
        stakingBalances[msg.sender] -= amount;
        _transfer(address(this), msg.sender, amount);
        
        emit TokensUnstaked(msg.sender, amount);
    }
    
    /**
     * @dev Distribute staking rewards (only owner)
     */
    function distributeRewards(address[] calldata users, uint256[] calldata amounts) external onlyOwner {
        require(users.length == amounts.length, "Arrays length mismatch");
        
        for (uint i = 0; i < users.length; i++) {
            stakingRewards[users[i]] += amounts[i];
        }
    }
    
    /**
     * @dev Claim staking rewards
     */
    function claimRewards() external whenNotPaused {
        uint256 reward = stakingRewards[msg.sender];
        require(reward > 0, "No rewards to claim");
        
        stakingRewards[msg.sender] = 0;
        _mint(msg.sender, reward);
        
        emit RewardsClaimed(msg.sender, reward);
    }
    
    /**
     * @dev Pause the contract (only owner)
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause the contract (only owner)
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Override transfer to include pause functionality
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
    
    /**
     * @dev Get user's total balance including staked tokens
     */
    function getTotalBalance(address user) external view returns (uint256) {
        return balanceOf(user) + stakingBalances[user];
    }
    
    /**
     * @dev Get user's staking info
     */
    function getStakingInfo(address user) external view returns (
        uint256 stakedAmount,
        uint256 pendingRewards,
        bool isPremium
    ) {
        return (
            stakingBalances[user],
            stakingRewards[user],
            premiumUsers[user]
        );
    }
}