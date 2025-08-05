import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FageBot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "¡Bienvenido! Soy FageBot, tu asistente en el mundo de Fagesas. Escríbeme para comenzar.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      content,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getBotResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes("hola")) {
      return "¡Hola! Soy FageBot, tu asistente de Fagesas. ¿Quieres que te muestre el portal completo?";
    } else if (lowerText.includes("rifa") || lowerText.includes("tómbola")) {
      return "Puedes participar en las rifas desde la sección Colectivo Tómbola.";
    } else if (lowerText.includes("casino")) {
      return "FageCasino está listo para que explores apuestas y juegos deportivos.";
    } else if (lowerText.includes("stream") || lowerText.includes("tv")) {
      return "FageStream te permite ver deportes y entretenimiento en vivo.";
    } else if (lowerText.includes("wallet") || lowerText.includes("cripto")) {
      return "FageWallet está preparado para manejar FageCoin y pagos simulados.";
    } else if (lowerText.includes("eventos")) {
      return "📌 Próximos eventos:\n- Fútbol: Barcelona vs Real Madrid\n- Tenis: Nadal vs Djokovic\n- UFC: McGregor vs Poirier";
    } else if (lowerText.startsWith("apostar")) {
      return "Para apostar, necesitas especificar: usuario, evento y monto. Ejemplo: 'apostar carlos123 Barcelona 20'";
    } else if (lowerText.startsWith("recargar")) {
      return "Para recargar saldo, especifica: usuario y monto. Ejemplo: 'recargar carlos123 50'";
    } else {
      return "Soy FageBot y estoy aquí para guiarte en el mundo de Fagesas. Pregúntame sobre casino, stream, wallet, tómbola o eventos.";
    }
  };

  const sendMessage = () => {
    const text = inputValue.trim();
    if (text === "") return;

    addMessage(text, 'user');
    setInputValue("");

    // Simulate bot response delay
    setTimeout(() => {
      const response = getBotResponse(text);
      addMessage(response, 'bot');
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="h-[90vh] flex flex-col">
          <CardHeader className="bg-card border-b border-border">
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
                <CardTitle className="text-2xl font-orbitron text-primary">
                  🤖 FageBot
                </CardTitle>
                <p className="text-muted-foreground">
                  Tu asistente inteligente en el mundo Fagesas
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-6" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg whitespace-pre-wrap ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1"
                />
                <Button onClick={sendMessage} className="bg-primary hover:bg-primary/90">
                  Enviar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FageBot;