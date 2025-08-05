import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Users, Timer, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Tombola = () => {
  const navigate = useNavigate();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const activeRaffles = [
    {
      id: 1,
      title: "Gran Rifa Mensual",
      prize: "10,000 FC + iPhone 15 Pro",
      ticketPrice: 25,
      totalTickets: 1000,
      soldTickets: 847,
      endDate: "2025-08-15 23:59",
      featured: true
    },
    {
      id: 2,
      title: "Rifa Express",
      prize: "2,500 FC",
      ticketPrice: 10,
      totalTickets: 250,
      soldTickets: 198,
      endDate: "2025-08-06 20:00",
      featured: false
    },
    {
      id: 3,
      title: "Rifa Deportiva",
      prize: "5,000 FC + Jersey Barcelona",
      ticketPrice: 15,
      totalTickets: 500,
      soldTickets: 342,
      endDate: "2025-08-10 18:00",
      featured: false
    }
  ];

  const recentWinners = [
    { name: "Carlos M.", prize: "1,500 FC", raffle: "Rifa Express #123" },
    { name: "Ana T.", prize: "3,200 FC", raffle: "Rifa Deportiva #45" },
    { name: "Luis G.", prize: "800 FC", raffle: "Mini Rifa #67" }
  ];

  const generateNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 50; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const toggleNumber = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else if (selectedNumbers.length < 6) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
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
              🎟 Colectivo Tómbola
            </h1>
            <p className="text-muted-foreground">
              Participa en rifas y sorteos emocionantes
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-lg font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">Rifas activas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-lg font-bold text-foreground">1,247</p>
                  <p className="text-xs text-muted-foreground">Participantes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Ticket className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-lg font-bold text-foreground">847</p>
                  <p className="text-xs text-muted-foreground">Boletos vendidos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Timer className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-lg font-bold text-foreground">6h 42m</p>
                  <p className="text-xs text-muted-foreground">Próximo sorteo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Raffles */}
          <div className="space-y-6">
            <h2 className="text-2xl font-orbitron font-bold text-primary">
              Rifas Disponibles
            </h2>
            
            {activeRaffles.map((raffle) => (
              <Card key={raffle.id} className={`bg-card border-border ${raffle.featured ? 'ring-2 ring-primary/50' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-orbitron text-foreground flex items-center gap-2">
                        {raffle.title}
                        {raffle.featured && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            DESTACADA
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-2xl font-bold text-primary mt-1">
                        {raffle.prize}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-primary border-primary">
                      {raffle.ticketPrice} FC
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="text-foreground">
                          {raffle.soldTickets}/{raffle.totalTickets} boletos
                        </span>
                      </div>
                      <Progress 
                        value={(raffle.soldTickets / raffle.totalTickets) * 100} 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Finaliza: {raffle.endDate}
                      </span>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Comprar Boleto
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Number Selection & Winners */}
          <div className="space-y-6">
            {/* Quick Pick */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-primary">
                  Selección Rápida
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Elige 6 números del 1 al 50
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {generateNumbers().slice(0, 25).map((number) => (
                    <Button
                      key={number}
                      variant={selectedNumbers.includes(number) ? "default" : "outline"}
                      size="sm"
                      className={`h-8 w-8 p-0 text-xs ${
                        selectedNumbers.includes(number) 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-primary hover:text-primary-foreground'
                      }`}
                      onClick={() => toggleNumber(number)}
                    >
                      {number}
                    </Button>
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {generateNumbers().slice(25, 50).map((number) => (
                    <Button
                      key={number}
                      variant={selectedNumbers.includes(number) ? "default" : "outline"}
                      size="sm"
                      className={`h-8 w-8 p-0 text-xs ${
                        selectedNumbers.includes(number) 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-primary hover:text-primary-foreground'
                      }`}
                      onClick={() => toggleNumber(number)}
                    >
                      {number}
                    </Button>
                  ))}
                </div>
                
                <div className="flex gap-2 mb-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedNumbers([])}
                    className="flex-1"
                  >
                    Limpiar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      const randomNumbers = [];
                      while (randomNumbers.length < 6) {
                        const num = Math.floor(Math.random() * 50) + 1;
                        if (!randomNumbers.includes(num)) {
                          randomNumbers.push(num);
                        }
                      }
                      setSelectedNumbers(randomNumbers);
                    }}
                    className="flex-1"
                  >
                    Aleatorio
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Números seleccionados: {selectedNumbers.sort((a, b) => a - b).join(', ') || 'Ninguno'}
                  </p>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={selectedNumbers.length !== 6}
                  >
                    Participar (15 FC)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Winners */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron text-primary">
                  Ganadores Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentWinners.map((winner, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{winner.name}</p>
                        <p className="text-sm text-muted-foreground">{winner.raffle}</p>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">
                        {winner.prize}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tombola;