import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, ExternalLink, Copy } from 'lucide-react';
import { useWeb3 } from '@/hooks/useWeb3';
import { useToast } from '@/hooks/use-toast';

const WalletConnect = () => {
  const { 
    account, 
    balance, 
    fageBalance, 
    isConnected, 
    connecting, 
    connectWallet, 
    disconnectWallet 
  } = useWeb3();
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado",
      description: "Dirección copiada al portapapeles",
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-8 text-center">
          <Wallet className="h-16 w-16 text-primary mx-auto mb-6" />
          <h3 className="text-2xl font-orbitron font-bold text-primary mb-4">
            Conectar Wallet
          </h3>
          <p className="text-muted-foreground mb-6">
            Conecta tu wallet MetaMask para acceder a FageCoins
          </p>
          <Button 
            onClick={connectWallet}
            disabled={connecting}
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            {connecting ? 'Conectando...' : 'Conectar MetaMask'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-full">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-primary">Wallet Conectada</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{formatAddress(account!)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0"
                  onClick={() => copyToClipboard(account!)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0"
                  onClick={() => window.open(`https://etherscan.io/address/${account}`, '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={disconnectWallet}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Desconectar
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-secondary/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">FageCoins</p>
            <p className="text-lg font-orbitron font-bold text-primary">
              {parseFloat(fageBalance).toFixed(2)} FC
            </p>
          </div>
          <div className="text-center p-4 bg-secondary/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">ETH Balance</p>
            <p className="text-lg font-orbitron font-bold text-foreground">
              {parseFloat(balance).toFixed(4)} ETH
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletConnect;