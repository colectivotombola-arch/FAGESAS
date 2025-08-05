import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Shield, Users, TrendingUp, Settings, Database, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleLogin = () => {
    if (credentials.username === "admin" && credentials.password === "Fagesas2025") {
      setIsAuthenticated(true);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="executive-card w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-orbitron executive-gradient">
              🔑 Admin Fagesas
            </CardTitle>
            <p className="text-muted-foreground">Panel Ejecutivo de Administración</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="text"
              placeholder="Usuario"
              className="w-full p-3 bg-background border border-border rounded-lg"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-3 bg-background border border-border rounded-lg"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
            />
            <Button onClick={handleLogin} className="w-full executive-button">
              Acceder
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Demo: admin / Fagesas2025
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const adminStats = [
    { icon: Users, label: "Usuarios Totales", value: "15,847", status: "active" },
    { icon: TrendingUp, label: "Ingresos Hoy", value: "$47,392", status: "up" },
    { icon: Database, label: "Sistema", value: "99.9%", status: "optimal" },
    { icon: Activity, label: "Transacciones", value: "2,394", status: "normal" }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Card className="executive-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <CardTitle className="text-3xl font-orbitron executive-gradient">
                      🔑 Panel Administrativo Fagesas
                    </CardTitle>
                    <p className="text-muted-foreground">Control Ejecutivo Total del Sistema</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-red-500/10 border-red-500/20 text-red-400">
                  <Shield className="w-3 h-3 mr-1" />
                  Admin Access
                </Badge>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <Card key={index} className="executive-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="system">Sistema</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="system">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="executive-card">
                <CardHeader>
                  <CardTitle>Estado del Sistema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>FageCasino</span>
                      <Badge className="bg-green-500/10 text-green-400">Operativo</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>FageStream</span>
                      <Badge className="bg-green-500/10 text-green-400">HD/4K</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>FageWallet</span>
                      <Badge className="bg-green-500/10 text-green-400">Seguro</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>FageBot</span>
                      <Badge className="bg-blue-500/10 text-blue-400">IA Activa</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="executive-card">
                <CardHeader>
                  <CardTitle>Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full executive-button">Backup Completo</Button>
                  <Button className="w-full" variant="outline">Reiniciar Servicios</Button>
                  <Button className="w-full" variant="outline">Limpiar Cache</Button>
                  <Button className="w-full" variant="outline">Generar Reportes</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card className="executive-card">
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Panel de gestión de usuarios disponible en la versión completa con Supabase
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="executive-card">
              <CardHeader>
                <CardTitle>Analytics Ejecutivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary">68%</div>
                    <div className="text-sm text-muted-foreground">Tasa de Conversión</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-400">+23%</div>
                    <div className="text-sm text-muted-foreground">Crecimiento Mensual</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400">4.8</div>
                    <div className="text-sm text-muted-foreground">Rating Promedio</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="executive-card">
              <CardHeader>
                <CardTitle>Configuración del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium">Modo Mantenimiento</h4>
                      <p className="text-sm text-muted-foreground">Activar para realizar actualizaciones</p>
                    </div>
                    <Button variant="outline" size="sm">Desactivado</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium">Backup Automático</h4>
                      <p className="text-sm text-muted-foreground">Backup cada 6 horas</p>
                    </div>
                    <Button variant="outline" size="sm">Activo</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;