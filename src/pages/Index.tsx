import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: "colectivotombola",
      title: "🎟 Colectivo Tómbola",
      description: "Participa en rifas y sorteos",
      path: "/tombola"
    },
    {
      id: "casino",
      title: "🎰 FageCasino",
      description: "Apuestas deportivas y juegos",
      path: "/casino"
    },
    {
      id: "tv",
      title: "📺 FageStream",
      description: "Streaming de deportes y entretenimiento",
      path: "/stream"
    },
    {
      id: "wallet",
      title: "👛 FageWallet",
      description: "Gestiona tus FageCoins",
      path: "/wallet"
    },
    {
      id: "fagebot",
      title: "🤖 FageBot",
      description: "Asistente inteligente",
      path: "/fagebot"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-orbitron text-6xl font-bold mb-4 text-primary glow-effect">
          🌐 FAGESAS
        </h1>
        <p className="text-xl text-muted-foreground mb-12 font-medium">
          Bienvenido al Mundo Central
        </p>
        <p className="text-lg text-foreground mb-8">
          Elige tu destino
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          {modules.map((module) => (
            <Card key={module.id} className="card-hover cursor-pointer bg-card border-border">
              <CardContent className="p-6">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full h-auto flex flex-col gap-3 text-left p-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  onClick={() => navigate(module.path)}
                >
                  <span className="text-2xl font-orbitron font-semibold text-primary">
                    {module.title}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {module.description}
                  </span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by Fagesas Technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
