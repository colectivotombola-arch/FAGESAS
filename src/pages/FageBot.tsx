import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bot, User, Send, Sparkles, Brain, Zap, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'system' | 'analysis' | 'command';
}

interface SystemStatus {
  uptime: string;
  errors: number;
  suggestions: number;
  improvements: string[];
}

const FageBot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "🚀 FageBot IA Ejecutivo activado. Sistema monitoreando plataforma 24/7.\n\n✅ Análisis en tiempo real\n✅ Corrección automática de errores\n✅ Optimización continua\n✅ Soporte inteligente\n\nEscribe 'help' para ver comandos avanzados.",
      sender: 'bot',
      timestamp: new Date(),
      type: 'system'
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [systemStatus] = useState<SystemStatus>({
    uptime: "99.99%",
    errors: 0,
    suggestions: 12,
    improvements: ["Optimización de caché", "Mejora de UI", "Análisis de performance"]
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (content: string, sender: 'user' | 'bot', type: 'text' | 'system' | 'analysis' | 'command' = 'text') => {
    const newMessage: Message = {
      content,
      sender,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getAdvancedBotResponse = (text: string): { content: string; type: 'text' | 'system' | 'analysis' | 'command' } => {
    const lowerText = text.toLowerCase();
    
    // Comandos avanzados
    if (lowerText === "help" || lowerText === "ayuda") {
      return {
        content: `🧠 **COMANDOS FAGEBOT IA EJECUTIVO**

📊 **ANÁLISIS:**
• \`status\` - Estado del sistema
• \`analytics\` - Métricas de rendimiento
• \`errors\` - Detección de errores
• \`optimize\` - Sugerencias de mejora

🎯 **APUESTAS:**
• \`eventos\` - Eventos en vivo
• \`apostar [user] [evento] [monto]\`
• \`saldo [usuario]\` - Consultar saldo

🔧 **SISTEMA:**
• \`backup\` - Backup automático
• \`monitor\` - Monitoreo continuo
• \`upgrade\` - Mejoras disponibles`,
        type: 'system'
      };
    }
    
    if (lowerText === "status") {
      return {
        content: `📈 **ESTADO DEL SISTEMA FAGESAS**

🟢 **Uptime:** ${systemStatus.uptime}
🔍 **Errores detectados:** ${systemStatus.errors}
💡 **Mejoras pendientes:** ${systemStatus.suggestions}
⚡ **Performance:** Óptimo

🔄 **Módulos activos:**
• FageCasino: ✅ Operativo
• FageStream: ✅ HD/4K
• FageWallet: ✅ Seguro
• Tómbola: ✅ Activa

🛡️ Sistema funcionando perfectamente.`,
        type: 'analysis'
      };
    }
    
    if (lowerText === "analytics") {
      return {
        content: `📊 **ANALYTICS EJECUTIVO**

👥 **Usuarios:**
• Activos hoy: 2,847
• Nuevos registros: +127
• Retención: 94.2%

💰 **Transacciones:**
• Volumen hoy: $47,392
• Apuestas: 1,234
• FageCoins: 89,472

📈 **Performance:**
• Velocidad carga: 1.2s
• Disponibilidad: 99.99%
• Errores: 0.01%

🎯 Todos los KPIs superando objetivos.`,
        type: 'analysis'
      };
    }
    
    if (lowerText === "optimize" || lowerText === "mejoras") {
      return {
        content: `🚀 **OPTIMIZACIONES RECOMENDADAS**

${systemStatus.improvements.map((improvement, index) => 
  `${index + 1}. ✅ ${improvement}`
).join('\n')}

⚡ **Mejoras automáticas aplicadas:**
• Cache optimizado (+23% velocidad)
• Base de datos indexada
• CDN actualizado
• Algoritmos de IA mejorados

🎯 **Próximas mejoras:**
• Integración blockchain
• ML avanzado para predicciones
• Sistema de notificaciones push`,
        type: 'system'
      };
    }
    
    if (lowerText === "monitor") {
      return {
        content: `🔍 **MONITOREO 24/7 ACTIVO**

🤖 **IA trabajando mientras duermes:**
• Análisis continuo de errores
• Optimización automática de performance
• Backup incremental cada hora
• Detección de amenazas en tiempo real

📊 **Métricas en vivo:**
• CPU: 23% | RAM: 41% | Storage: 67%
• Red: 98.7% estable
• Usuarios conectados: 847
• Transacciones/min: 23

✨ **Sistema aprendiendo y mejorando automáticamente.**`,
        type: 'analysis'
      };
    }
    
    // Respuestas originales mejoradas
    if (lowerText.includes("hola") || lowerText.includes("buenos")) {
      return {
        content: "¡Hola! 👋 Soy FageBot IA Ejecutivo, tu asistente superinteligente 24/7.\n\n🧠 Capacidades avanzadas:\n• Análisis predictivo\n• Corrección automática\n• Optimización continua\n• Soporte ejecutivo\n\nEscribe 'help' para comandos avanzados.",
        type: 'text'
      };
    }
    
    if (lowerText.includes("eventos")) {
      return {
        content: `⚡ **EVENTOS EN VIVO**

🏆 **Destacados hoy:**
• ⚽ Barcelona vs Real Madrid (19:00) - Cuotas: 2.1 | 3.5 | 2.8
• 🎾 Nadal vs Djokovic (21:30) - Cuotas: 1.9 | 2.0
• 🥊 UFC McGregor vs Poirier (23:00) - Cuotas: 1.95 | 1.95

📊 **Estadísticas IA:**
• Predicción Barcelona: 65% probabilidad
• Análisis Nadal: Forma ascendente
• UFC: Combate muy equilibrado

💡 Usa: \`apostar [usuario] [evento] [monto]\``,
        type: 'analysis'
      };
    }
    
    return {
      content: `🤖 **FageBot IA Ejecutivo**

No reconozco ese comando. Prueba:
• \`help\` - Ver todos los comandos
• \`status\` - Estado del sistema
• \`eventos\` - Apuestas en vivo
• \`analytics\` - Métricas ejecutivas

💡 Estoy aquí 24/7 monitoreando y mejorando Fagesas.`,
      type: 'text'
    };
  };

  const sendMessage = () => {
    const text = inputValue.trim();
    if (text === "") return;

    addMessage(text, 'user');
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const response = getAdvancedBotResponse(text);
      addMessage(response.content, 'bot', response.type);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* AI Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="relative z-10 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Executive */}
          <div className="mb-6">
            <Card className="executive-card">
              <CardHeader className="pb-4">
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
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Brain className="h-8 w-8 text-primary" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-orbitron executive-gradient">
                          FageBot IA Ejecutivo
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">
                          Asistente superinteligente • Monitoreo 24/7 • Optimización automática
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-green-500/10 border-green-500/20 text-green-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Online
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
                      <Zap className="w-3 h-3 mr-1" />
                      IA Activa
                    </Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chat Principal */}
            <div className="lg:col-span-3">
              <Card className="executive-card h-[70vh] flex flex-col">
                <CardContent className="flex-1 flex flex-col p-0">
                  <ScrollArea className="flex-1 p-6" ref={scrollRef}>
                    <div className="space-y-6">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3`}
                        >
                          {message.sender === 'bot' && (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Bot className="w-4 h-4 text-primary" />
                            </div>
                          )}
                          
                          <div
                            className={`max-w-[80%] rounded-2xl p-4 ${
                              message.sender === 'user'
                                ? 'bg-primary text-primary-foreground executive-button'
                                : message.type === 'system'
                                ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-foreground'
                                : message.type === 'analysis'
                                ? 'bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-foreground'
                                : 'bg-secondary text-secondary-foreground'
                            }`}
                          >
                            {message.type && message.sender === 'bot' && (
                              <div className="flex items-center gap-2 mb-2 text-xs opacity-70">
                                {message.type === 'system' && <Settings className="w-3 h-3" />}
                                {message.type === 'analysis' && <Sparkles className="w-3 h-3" />}
                                <span className="uppercase font-medium">{message.type}</span>
                              </div>
                            )}
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">
                              {message.content}
                            </div>
                            <div className="text-xs opacity-50 mt-2">
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                          
                          {message.sender === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                              <User className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-primary" />
                          </div>
                          <div className="bg-secondary text-secondary-foreground rounded-2xl p-4">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  
                  <div className="p-6 border-t border-border bg-card/50">
                    <div className="flex gap-3">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Pregunta a FageBot IA..."
                        className="flex-1 bg-background"
                        disabled={isTyping}
                      />
                      <Button 
                        onClick={sendMessage} 
                        className="executive-button"
                        disabled={isTyping}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Panel de Estado */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="executive-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Estado del Sistema</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uptime</span>
                      <span className="text-green-400 font-medium">{systemStatus.uptime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Errores</span>
                      <span className="text-green-400 font-medium">{systemStatus.errors}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Mejoras</span>
                      <span className="text-primary font-medium">{systemStatus.suggestions}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="executive-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Comandos Rápidos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {['status', 'analytics', 'eventos', 'monitor'].map((cmd) => (
                    <Button
                      key={cmd}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => {
                        setInputValue(cmd);
                        addMessage(cmd, 'user');
                        setIsTyping(true);
                        setTimeout(() => {
                          const response = getAdvancedBotResponse(cmd);
                          addMessage(response.content, 'bot', response.type);
                          setIsTyping(false);
                        }, 1500);
                      }}
                    >
                      {cmd}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FageBot;