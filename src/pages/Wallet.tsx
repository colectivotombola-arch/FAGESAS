import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Wallet as WalletIcon, Send, ArrowUpRight, ArrowDownLeft, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const navigate = useNavigate();
  const [balance] = useState(2847.50);
  const [sendAmount, setSendAmount] = useState("");

  const transactions = [
    {
      id: 1,
      type: "receive",
      amount: 150.00,
      description: "Ganancia Casino - Barcelona vs Real Madrid",
      date: "2025-08-05 14:30",
      status: "completed"
    },
    {
      id: 2,
      type: "send",
      amount: -50.00,
      description: "Apuesta - Nadal vs Djokovic",
      date: "2025-08-05 12:15",
      status: "completed"
    },
    {
      id: 3,
      type: "receive",
      amount: 100.00,
      description: "Recarga de saldo",
      date: "2025-08-05 10:00",
      status: "completed"
    },
    {
      id: 4,
      type: "send",
      amount: -25.00,
      description: "Participación Tómbola #124",
      date: "2025-08-04 16:45",
      status: "completed"
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

        {/* Balance Card */}
        <Card className="mb-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8">
            <div className="text-center">
              <WalletIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-sm text-muted-foreground mb-2">Saldo Total</h2>
              <p className="text-5xl font-orbitron font-bold text-primary mb-4">
                {balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })} FC
              </p>
              <p className="text-sm text-muted-foreground">FageCoins</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <ArrowDownLeft className="h-4 w-4 mr-2" />
                Recibir
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Enviar
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Send Money */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-orbitron text-primary flex items-center gap-2">
                <Send className="h-5 w-5" />
                Enviar FageCoins
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Usuario destinatario
                </label>
                <Input placeholder="@usuario o ID" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Cantidad
                </label>
                <Input 
                  type="number" 
                  placeholder="0.00"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Nota (opcional)
                </label>
                <Input placeholder="Concepto del envío..." />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Enviar FageCoins
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-orbitron text-primary flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Estadísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Ganado este mes</span>
                <span className="text-green-500 font-semibold">+542.30 FC</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Apostado este mes</span>
                <span className="text-red-500 font-semibold">-318.75 FC</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Transacciones</span>
                <span className="text-foreground font-semibold">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Referidos activos</span>
                <span className="text-foreground font-semibold">7</span>
              </div>
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
                <div key={tx.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
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
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      tx.amount > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} FC
                    </p>
                    <p className="text-sm text-muted-foreground">Completado</p>
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