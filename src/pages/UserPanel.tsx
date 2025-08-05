import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, DollarSign, Trophy, Target, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ApiResponse {
  status: string;
  message?: string;
  data?: any;
}

const UserPanel = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  
  // Form states
  const [betForm, setBetForm] = useState({ usuario: "", evento: "", monto: "" });
  const [rechargeForm, setRechargeForm] = useState({ usuario: "", monto: "" });
  const [resultForm, setResultForm] = useState({ evento: "", apuesta: "", monto: "" });

  const handleApiCall = async (endpoint: string, method: 'GET' | 'POST' = 'GET', data?: any, key: string = endpoint) => {
    setIsLoading(prev => ({ ...prev, [key]: true }));
    
    try {
      const apiUrl = `/api/${endpoint}`;
      const config: RequestInit = {
        method,
        headers: method === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
        body: method === 'POST' && data ? JSON.stringify(data) : undefined,
      };
      
      const response = await fetch(apiUrl, config);
      const result = await response.json();
      
      setResponses(prev => ({ 
        ...prev, 
        [key]: JSON.stringify(result, null, 2) 
      }));
    } catch (error) {
      setResponses(prev => ({ 
        ...prev, 
        [key]: `Error: ${error instanceof Error ? error.message : 'API no disponible en modo desarrollo'}`
      }));
    } finally {
      setIsLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleBet = () => {
    if (betForm.usuario && betForm.evento && betForm.monto) {
      handleApiCall('apuestas.php', 'POST', betForm, 'bet');
    }
  };

  const handleRecharge = () => {
    if (rechargeForm.usuario && rechargeForm.monto) {
      handleApiCall('recargar.php', 'POST', rechargeForm, 'recharge');
    }
  };

  const handleResult = () => {
    if (resultForm.evento && resultForm.apuesta && resultForm.monto) {
      const params = new URLSearchParams({
        evento: resultForm.evento,
        apuesta: resultForm.apuesta,
        monto: resultForm.monto
      });
      handleApiCall(`resultados.php?${params}`, 'GET', undefined, 'result');
    }
  };

  const stats = [
    { icon: DollarSign, label: "Balance Total", value: "$2,847", change: "+12%" },
    { icon: Trophy, label: "Apuestas Ganadas", value: "47", change: "+8%" },
    { icon: Target, label: "Precisión", value: "68%", change: "+5%" },
    { icon: Activity, label: "Eventos Activos", value: "12", change: "0%" }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Card className="executive-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => navigate('/')}
                    className="hover:bg-accent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <CardTitle className="text-3xl font-orbitron executive-gradient">
                      🌐 Panel Usuario Fagesas
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Dashboard interactivo para gestionar tus actividades
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
                  Demo Mode
                </Badge>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="executive-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="text-right">
                    <stat.icon className="h-8 w-8 text-primary mb-2" />
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-muted-foreground'}`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="bet">Apostar</TabsTrigger>
            <TabsTrigger value="recharge">Recargar</TabsTrigger>
            <TabsTrigger value="results">Resultados</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <Card className="executive-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Eventos Deportivos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => handleApiCall('index.php', 'GET', undefined, 'events')}
                  disabled={isLoading.events}
                  className="executive-button mb-4"
                >
                  {isLoading.events ? 'Cargando...' : 'Cargar Eventos'}
                </Button>
                {responses.events && (
                  <pre className="bg-secondary p-4 rounded-lg text-sm overflow-auto max-h-96">
                    {responses.events}
                  </pre>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="executive-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Usuarios y Saldos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => handleApiCall('usuarios.php', 'GET', undefined, 'users')}
                  disabled={isLoading.users}
                  className="executive-button mb-4"
                >
                  {isLoading.users ? 'Cargando...' : 'Cargar Usuarios'}
                </Button>
                {responses.users && (
                  <pre className="bg-secondary p-4 rounded-lg text-sm overflow-auto max-h-96">
                    {responses.users}
                  </pre>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bet">
            <Card className="executive-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Realizar Apuesta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Usuario (ej: carlos123)"
                    value={betForm.usuario}
                    onChange={(e) => setBetForm(prev => ({ ...prev, usuario: e.target.value }))}
                  />
                  <Input
                    placeholder="Evento (ej: Barcelona)"
                    value={betForm.evento}
                    onChange={(e) => setBetForm(prev => ({ ...prev, evento: e.target.value }))}
                  />
                  <Input
                    type="number"
                    placeholder="Monto"
                    value={betForm.monto}
                    onChange={(e) => setBetForm(prev => ({ ...prev, monto: e.target.value }))}
                  />
                </div>
                <Button 
                  onClick={handleBet}
                  disabled={isLoading.bet}
                  className="executive-button"
                >
                  {isLoading.bet ? 'Procesando...' : 'Enviar Apuesta'}
                </Button>
                {responses.bet && (
                  <pre className="bg-secondary p-4 rounded-lg text-sm overflow-auto max-h-64">
                    {responses.bet}
                  </pre>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recharge">
            <Card className="executive-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Recargar Saldo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Usuario (ej: carlos123)"
                    value={rechargeForm.usuario}
                    onChange={(e) => setRechargeForm(prev => ({ ...prev, usuario: e.target.value }))}
                  />
                  <Input
                    type="number"
                    placeholder="Monto a recargar"
                    value={rechargeForm.monto}
                    onChange={(e) => setRechargeForm(prev => ({ ...prev, monto: e.target.value }))}
                  />
                </div>
                <Button 
                  onClick={handleRecharge}
                  disabled={isLoading.recharge}
                  className="executive-button"
                >
                  {isLoading.recharge ? 'Procesando...' : 'Recargar Saldo'}
                </Button>
                {responses.recharge && (
                  <pre className="bg-secondary p-4 rounded-lg text-sm overflow-auto max-h-64">
                    {responses.recharge}
                  </pre>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card className="executive-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Verificar Resultados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Evento (ej: Barcelona vs Real Madrid)"
                    value={resultForm.evento}
                    onChange={(e) => setResultForm(prev => ({ ...prev, evento: e.target.value }))}
                  />
                  <Input
                    placeholder="Tu apuesta (ej: Barcelona)"
                    value={resultForm.apuesta}
                    onChange={(e) => setResultForm(prev => ({ ...prev, apuesta: e.target.value }))}
                  />
                  <Input
                    type="number"
                    placeholder="Monto apostado"
                    value={resultForm.monto}
                    onChange={(e) => setResultForm(prev => ({ ...prev, monto: e.target.value }))}
                  />
                </div>
                <Button 
                  onClick={handleResult}
                  disabled={isLoading.result}
                  className="executive-button"
                >
                  {isLoading.result ? 'Verificando...' : 'Verificar Resultado'}
                </Button>
                {responses.result && (
                  <pre className="bg-secondary p-4 rounded-lg text-sm overflow-auto max-h-64">
                    {responses.result}
                  </pre>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Panel Usuario Fagesas © 2025 - Modo Demostración
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;