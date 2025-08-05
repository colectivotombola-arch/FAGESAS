import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, Shield, Activity, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SystemOptimizer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [optimizing, setOptimizing] = useState(false);
  const [lastOptimization, setLastOptimization] = useState<string | null>(null);

  const performOptimization = async () => {
    setOptimizing(true);
    
    try {
      const response = await supabase.functions.invoke('system-monitor', {
        body: new URLSearchParams({ action: 'optimize_system' })
      });

      if (response.data?.success) {
        setLastOptimization(new Date().toLocaleString());
        toast({
          title: "🚀 Optimización Completada",
          description: `${response.data.optimizations.length} mejoras aplicadas exitosamente`,
        });
      }
    } catch (error) {
      console.error('Error optimizing system:', error);
      toast({
        title: "Error en Optimización",
        description: "No se pudo completar la optimización automática",
        variant: "destructive"
      });
    } finally {
      setOptimizing(false);
    }
  };

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
              ⚡ Sistema Autónomo
            </h1>
            <p className="text-muted-foreground">
              Optimización y mantenimiento automático 24/7
            </p>
          </div>
        </div>

        {/* Optimization Controls */}
        <Card className="mb-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl font-orbitron text-primary flex items-center gap-2">
              <Zap className="h-6 w-6" />
              Centro de Optimización
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Estado del Sistema</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Rendimiento General</span>
                      <span className="text-green-500">98.7%</span>
                    </div>
                    <Progress value={98.7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Optimización BD</span>
                      <span className="text-green-500">95.2%</span>
                    </div>
                    <Progress value={95.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Cache Efficiency</span>
                      <span className="text-green-500">91.8%</span>
                    </div>
                    <Progress value={91.8} className="h-2" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Controles Automáticos</h3>
                <div className="space-y-4">
                  <Button 
                    onClick={performOptimization}
                    disabled={optimizing}
                    className="w-full bg-gradient-primary hover:opacity-90 text-white"
                  >
                    {optimizing ? (
                      <>
                        <Activity className="h-4 w-4 mr-2 animate-spin" />
                        Optimizando Sistema...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Optimización Inmediata
                      </>
                    )}
                  </Button>
                  
                  {lastOptimization && (
                    <p className="text-sm text-muted-foreground text-center">
                      Última optimización: {lastOptimization}
                    </p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="secondary" className="justify-center">
                      <Shield className="h-3 w-3 mr-1" />
                      Seguro
                    </Badge>
                    <Badge variant="secondary" className="justify-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +15% Más Rápido
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auto-Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-orbitron text-primary">
                🔄 Auto-Optimización
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Sistema que mejora automáticamente el rendimiento cada 30 minutos
              </p>
              <Badge className="bg-green-500/20 text-green-500">ACTIVO 24/7</Badge>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-orbitron text-primary">
                🛡️ Auto-Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Monitoreo continuo y aplicación automática de parches de seguridad
              </p>
              <Badge className="bg-green-500/20 text-green-500">PROTEGIDO</Badge>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-orbitron text-primary">
                💾 Auto-Backup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Respaldo automático de datos cada 4 horas con recuperación instantánea
              </p>
              <Badge className="bg-blue-500/20 text-blue-500">PROGRAMADO</Badge>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-orbitron text-primary">
                📊 Auto-Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Análisis inteligente de patrones de uso y sugerencias automáticas
              </p>
              <Badge className="bg-purple-500/20 text-purple-500">APRENDIENDO</Badge>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-orbitron text-primary">
                🚀 Auto-Scaling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Ajuste automático de recursos según demanda en tiempo real
              </p>
              <Badge className="bg-orange-500/20 text-orange-500">ADAPTÁNDOSE</Badge>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-orbitron text-primary">
                🧠 Auto-ML
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Machine Learning que mejora la experiencia de usuario automáticamente
              </p>
              <Badge className="bg-cyan-500/20 text-cyan-500">EVOLUCIONANDO</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Sistema autónomo trabajando 24/7 para mantener FAGESAS en perfecto estado
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemOptimizer;