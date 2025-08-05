import { useState, useEffect } from 'react';
import Web3 from 'web3';

// FageCoin Contract ABI (ERC-20 standard)
const FAGECOIN_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "initialSupply", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "spender", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "spender", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "from", "type": "address"},
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transferFrom",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Contract address (will be set after deployment)
const FAGECOIN_CONTRACT_ADDRESS = "0x742d35Cc693C6e8804a0b0Cc4a3B4F2E5a8E1B8D"; // Placeholder - replace with actual deployed address

interface UseWeb3Return {
  web3: Web3 | null;
  account: string | null;
  balance: string;
  fageBalance: string;
  isConnected: boolean;
  connecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  sendTransaction: (to: string, amount: string) => Promise<string>;
  sendFageCoins: (to: string, amount: string) => Promise<string>;
  refreshBalance: () => Promise<void>;
}

export const useWeb3 = (): UseWeb3Return => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [fageBalance, setFageBalance] = useState<string>('0');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      setConnecting(true);
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          await updateBalances(web3Instance, accounts[0]);
        }
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      } finally {
        setConnecting(false);
      }
    } else {
      alert('Please install MetaMask or another Web3 wallet!');
    }
  };

  const disconnectWallet = () => {
    setWeb3(null);
    setAccount(null);
    setBalance('0');
    setFageBalance('0');
    setIsConnected(false);
  };

  const updateBalances = async (web3Instance: Web3, accountAddress: string) => {
    try {
      // Get ETH balance
      const ethBalance = await web3Instance.eth.getBalance(accountAddress);
      setBalance(web3Instance.utils.fromWei(ethBalance, 'ether'));

      // Get FageCoin balance
      const contract = new web3Instance.eth.Contract(FAGECOIN_ABI, FAGECOIN_CONTRACT_ADDRESS);
      const fageBalanceWei = await contract.methods.balanceOf(accountAddress).call() as string;
      const fageBalanceFormatted = web3Instance.utils.fromWei(fageBalanceWei.toString(), 'ether');
      setFageBalance(fageBalanceFormatted);
    } catch (error) {
      console.error('Error updating balances:', error);
    }
  };

  const refreshBalance = async () => {
    if (web3 && account) {
      await updateBalances(web3, account);
    }
  };

  const sendTransaction = async (to: string, amount: string): Promise<string> => {
    if (!web3 || !account) throw new Error('Wallet not connected');

    const amountWei = web3.utils.toWei(amount, 'ether');
    const tx = await web3.eth.sendTransaction({
      from: account,
      to,
      value: amountWei,
    });

    await refreshBalance();
    return tx.transactionHash as string;
  };

  const sendFageCoins = async (to: string, amount: string): Promise<string> => {
    if (!web3 || !account) throw new Error('Wallet not connected');

    const contract = new web3.eth.Contract(FAGECOIN_ABI, FAGECOIN_CONTRACT_ADDRESS);
    const amountWei = web3.utils.toWei(amount, 'ether');
    
    const tx = await contract.methods.transfer(to, amountWei).send({
      from: account,
    });

    await refreshBalance();
    return tx.transactionHash as string;
  };

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (accounts[0] !== account) {
          setAccount(accounts[0]);
          if (web3) {
            updateBalances(web3, accounts[0]);
          }
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [account, web3]);

  // Auto-connect if already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.getAccounts();
        
        if (accounts.length > 0) {
          setWeb3(web3Instance);
          setAccount(accounts[0]);
          setIsConnected(true);
          await updateBalances(web3Instance, accounts[0]);
        }
      }
    };

    checkConnection();
  }, []);

  return {
    web3,
    account,
    balance,
    fageBalance,
    isConnected,
    connecting,
    connectWallet,
    disconnectWallet,
    sendTransaction,
    sendFageCoins,
    refreshBalance,
  };
};

declare global {
  interface Window {
    ethereum?: any;
  }
}