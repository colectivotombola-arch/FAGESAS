import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Wallet as WalletIcon, Send, ArrowUpRight, ArrowDownLeft, TrendingUp, AlertCircle, CheckCircle, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "@/hooks/useWeb3";
import { useToast } from "@/hooks/use-toast";
import WalletConnect from "@/components/WalletConnect";

const Wallet = () => {
  const navigate = useNavigate();
  const { 
    account, 
    fageBalance, 
    isConnected, 
    sendFageCoins, 
    refreshBalance 
  } = useWeb3();
  const { toast } = useToast();
  
  const [sendAmount, setSendAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [sendNote, setSendNote] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendFageCoins = async () => {
    if (!sendAmount || !recipientAddress) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    if (!isConnected) {
      toast({
        title: "Wallet no conectada",
        description: "Por favor conecta tu wallet primero",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const txHash = await sendFageCoins(recipientAddress, sendAmount);
      
      toast({
        title: "¡Transacción enviada!",
        description: `Hash: ${txHash.slice(0, 20)}...`,
      });

      // Reset form
      setSendAmount("");
      setRecipientAddress("");
      setSendNote("");
      
      // Refresh balance
      await refreshBalance();
    } catch (error) {
      toast({
        title: "Error en la transacción",
        description: error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const transactions = [
    {
      id: 1,
      type: "receive",
      amount: 150.00,
      description: "Ganancia Casino - Barcelona vs Real Madrid",
      date: "2025-08-05 14:30",
      status: "completed",
      hash: "0x742d35Cc693C6e8804a0b0Cc4a3B4F2E5a8E1B8D"
    },
    {
      id: 2,
      type: "send",
      amount: -50.00,
      description: "Apuesta - Nadal vs Djokovic",
      date: "2025-08-05 12:15",
      status: "completed",
      hash: "0x852d45Dd794D7f9814b1b1Ee5b4F3F6F9b9F2C9E"
    },
    {
      id: 3,
      type: "receive",
      amount: 100.00,
      description: "Recarga de saldo",
      date: "2025-08-05 10:00",
      status: "completed",
      hash: "0x962e55Ee895E8f1925c2c2Ff6c5F4F7F0c0F3D0F"
    },
    {
      id: 4,
      type: "send",
      amount: -25.00,
      description: "Participación Tómbola #124",
      date: "2025-08-04 16:45",
      status: "completed",
      hash: "0x073f66Ff906F9f2036d3d300759F5F8F1d1F4E1F"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-4xl font-orbitron font-bold text-primary">
              👛 FageWallet
            </h1>
            <p className="text-muted-foreground">
              Gestiona tus FageCoins de forma segura
            </p>
          </div>
        </div>

        {/* Wallet Connection */}
        <div className="mb-8">
          <WalletConnect />
        </div>

        {/* Balance Card - Only show if connected */}
        {isConnected && (
          <Card className="mb-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center">
                <WalletIcon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-sm text-muted-foreground mb-2">Saldo FageCoins</h2>
                <p className="text-5xl font-orbitron font-bold text-primary mb-4">
                  {parseFloat(fageBalance).toLocaleString('es-ES', { minimumFractionDigits: 2 })} FC
                </p>
                <p className="text-sm text-muted-foreground">
                  Dirección: {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'No conectada'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => {
                    if (account) {
                      navigator.clipboard.writeText(account);
                      toast({
                        title: "Dirección copiada",
                        description: "Comparte esta dirección para recibir FageCoins",
                      });
                    }
                  }}
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Recibir
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => document.getElementById('send-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Enviar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Send Money */}
          <Card id="send-section" className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-orbitron text-primary flex items-center gap-2">
                <Send className="h-5 w-5" />
                Enviar FageCoins
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isConnected ? (
                <div className="text-center p-8 text-muted-foreground">
                  <AlertCircle className="h-8 w-8 mx-auto mb-4" />
                  <p>Conecta tu wallet para enviar FageCoins</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Dirección destinatario *
                    </label>
                    <Input 
                      placeholder="0x..."
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Cantidad *
                    </label>
                    <Input 
                      type="number" 
                      placeholder="0.00"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      step="0.01"
                      min="0"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Disponible: {parseFloat(fageBalance).toFixed(2)} FC
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Nota (opcional)
                    </label>
                    <Input 
                      placeholder="Concepto del envío..."
                      value={sendNote}
                      onChange={(e) => setSendNote(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={handleSendFageCoins}
                    disabled={isSending || !sendAmount || !recipientAddress}
                  >
                    {isSending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      'Enviar FageCoins'
                    )}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-orbitron text-primary flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Estadísticas Blockchain
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status de Red</span>
                <span className="text-green-500 font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Ethereum Mainnet
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Wallet Conectada</span>
                <span className={`font-semibold ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
                  {isConnected ? 'Sí' : 'No'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total FageCoins</span>
                <span className="text-foreground font-semibold">
                  {isConnected ? `${parseFloat(fageBalance).toFixed(2)} FC` : '---'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Transacciones</span>
                <span className="text-foreground font-semibold">{transactions.length}</span>
              </div>
              {isConnected && account && (
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => window.open(`https://etherscan.io/address/${account}`, '_blank')}
                >
                  Ver en Etherscan
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="mt-8 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl font-orbitron text-primary">
              Historial de Transacciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/40 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      tx.type === 'receive' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {tx.type === 'receive' ? (
                        <ArrowDownLeft className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{tx.description}</p>
                      <p className="text-sm text-muted-foreground">{tx.date}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        Hash: {tx.hash.slice(0, 12)}...
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      tx.amount > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} FC
                    </p>
                    <p className="text-sm text-muted-foreground">Completado</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs mt-1"
                      onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, '_blank')}
                    >
                      Ver TX
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;