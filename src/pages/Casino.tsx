import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Users, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Casino = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const events = [
    {
      id: 1,
      sport: "Fútbol",
      match: "Barcelona vs Real Madrid",
      time: "2025-08-05 20:00",
      odds: {
        home: 1.85,
        draw: 3.20,
        away: 2.10
      }
    },
    {
      id: 2,
      sport: "Tenis",
      match: "Nadal vs Djokovic",
      time: "2025-08-06 16:00",
      odds: {
        player1: 2.00,
        player2: 1.70
      }
    },
    {
      id: 3,
      sport: "UFC",
      match: "McGregor vs Poirier",
      time: "2025-08-07 22:00",
      odds: {
        fighter1: 1.95,
        fighter2: 1.95
      }
    }
  ];

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
              🎰 FageCasino
            </h1>
            <p className="text-muted-foreground">
              Apuestas deportivas y entretenimiento
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">156</p>
                  <p className="text-sm text-muted-foreground">Eventos en vivo</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">2,847</p>
                  <p className="text-sm text-muted-foreground">Usuarios activos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Timer className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Próximos eventos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-orbitron text-primary">
              Eventos Destacados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="bg-secondary/50 border-border card-hover">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {event.match}
                        </h3>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            {event.sport}
                          </span>
                          <span>{event.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {event.sport === "Fútbol" && (
                          <>
                            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
                              Local {event.odds.home}
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
                              Empate {event.odds.draw}
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
                              Visitante {event.odds.away}
                            </Button>
                          </>
                        )}
                        {event.sport === "Tenis" && (
                          <>
                            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
                              Nadal {event.odds.player1}
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
                              Djokovic {event.odds.player2}
                            </Button>
                          </>
                        )}
                        {event.sport === "UFC" && (
                          <>
                            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
                              McGregor {event.odds.fighter1}
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
                              Poirier {event.odds.fighter2}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Apuesta responsablemente. Solo para mayores de 18 años.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Casino;