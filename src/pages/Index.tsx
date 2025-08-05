import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Sparkles, TrendingUp, Users, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: "colectivotombola",
      title: "🎟 Colectivo Tómbola",
      description: "Rifas exclusivas y sorteos premium",
      path: "/tombola",
      color: "from-purple-500 to-pink-500",
      icon: "🎲",
      status: "Activo"
    },
    {
      id: "casino",
      title: "🎰 FageCasino",
      description: "Apuestas deportivas en tiempo real",
      path: "/casino",
      color: "from-green-500 to-emerald-500",
      icon: "⚡",
      status: "En Vivo"
    },
    {
      id: "tv",
      title: "📺 FageStream",
      description: "Streaming premium HD/4K",
      path: "/stream",
      color: "from-blue-500 to-cyan-500",
      icon: "📡",
      status: "HD"
    },
    {
      id: "wallet",
      title: "👛 FageWallet",
      description: "Gestión avanzada de FageCoins",
      path: "/wallet",
      color: "from-yellow-500 to-orange-500",
      icon: "💎",
      status: "Seguro"
    },
    {
      id: "fagebot",
      title: "🤖 FageBot",
      description: "IA Avanzada - Asistente Ejecutivo",
      path: "/fagebot",
      color: "from-indigo-500 to-purple-500",
      icon: "🧠",
      status: "AI"
    }
  ];

  const stats = [
    { icon: Users, label: "Usuarios Activos", value: "15,847" },
    { icon: TrendingUp, label: "Transacciones/día", value: "2,394" },
    { icon: Shield, label: "Seguridad", value: "99.9%" },
    { icon: Sparkles, label: "Uptime", value: "99.99%" }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero Background Effect */}
      <div className="absolute inset-0 hero-glow"></div>
      
      {/* Navigation Stats Bar */}
      <div className="relative z-10 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 text-center">
                <stat.icon className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-sm font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="floating-animation mb-6">
              <h1 className="font-orbitron text-7xl md:text-8xl font-black mb-4 executive-gradient glow-effect">
                FAGESAS
              </h1>
            </div>
            
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              🚀 Plataforma Ejecutiva v2.0
            </Badge>
            
            <p className="text-2xl md:text-3xl text-foreground mb-6 font-medium">
              Bienvenido al <span className="executive-gradient font-bold">Mundo Central</span>
            </p>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              La plataforma más avanzada para entretenimiento digital, apuestas deportivas, 
              streaming premium y gestión financiera descentralizada.
            </p>
          </div>
          
          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {modules.map((module, index) => (
              <Card key={module.id} className="executive-card cursor-pointer group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity" 
                     style={{background: `linear-gradient(135deg, var(--primary), var(--accent))`}} />
                
                <CardContent className="relative p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl mb-4">{module.icon}</div>
                    <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
                      {module.status}
                    </Badge>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full h-auto flex flex-col gap-4 text-left p-0 hover:bg-transparent group"
                    onClick={() => navigate(module.path)}
                  >
                    <h3 className="text-xl font-orbitron font-bold text-primary group-hover:text-primary/80 transition-colors">
                      {module.title.split(' ').slice(1).join(' ')}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {module.description}
                    </p>
                    
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            <Card className="executive-card cursor-pointer" onClick={() => window.open('/panel', '_blank')}>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">🌐</div>
                <h3 className="font-orbitron font-bold text-primary mb-2">Panel Usuario</h3>
                <p className="text-sm text-muted-foreground">Dashboard interactivo de usuario</p>
              </CardContent>
            </Card>
            
            <Card className="executive-card cursor-pointer" onClick={() => window.open('/admin', '_blank')}>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">🔑</div>
                <h3 className="font-orbitron font-bold text-primary mb-2">Panel Admin</h3>
                <p className="text-sm text-muted-foreground">Control ejecutivo avanzado</p>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">
                  Sistema Operativo | Todos los módulos activos
                </span>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <span className="executive-gradient font-medium">Fagesas Technology</span> © 2025
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
