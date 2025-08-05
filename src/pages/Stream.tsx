import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Users, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Stream = () => {
  const navigate = useNavigate();

  const liveStreams = [
    {
      id: 1,
      title: "Barcelona vs Real Madrid",
      category: "Fútbol",
      viewers: 45672,
      thumbnail: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=225&fit=crop&crop=center",
      isLive: true
    },
    {
      id: 2,
      title: "NBA Finals - Lakers vs Celtics",
      category: "Baloncesto",
      viewers: 32198,
      thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=225&fit=crop&crop=center",
      isLive: true
    },
    {
      id: 3,
      title: "Champions League Highlights",
      category: "Fútbol",
      viewers: 18453,
      thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=225&fit=crop&crop=center",
      isLive: false
    }
  ];

  const categories = [
    { name: "Fútbol", count: 23, icon: "⚽" },
    { name: "Baloncesto", count: 15, icon: "🏀" },
    { name: "Tenis", count: 8, icon: "🎾" },
    { name: "UFC/MMA", count: 5, icon: "🥊" },
    { name: "Esports", count: 12, icon: "🎮" }
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
              📺 FageStream
            </h1>
            <p className="text-muted-foreground">
              Streaming de deportes y entretenimiento en vivo
            </p>
          </div>
        </div>

        {/* Categories */}
        <Card className="mb-8 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl font-orbitron text-primary">
              Categorías
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Card key={category.name} className="bg-secondary/50 border-border card-hover cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} streams</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Streams */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-2xl font-orbitron text-primary flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              En Vivo Ahora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveStreams.map((stream) => (
                <Card key={stream.id} className="bg-secondary/50 border-border card-hover cursor-pointer overflow-hidden">
                  <div className="relative">
                    <img 
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button size="lg" className="bg-primary/90 hover:bg-primary">
                        <Play className="h-5 w-5 mr-2" />
                        Ver Stream
                      </Button>
                    </div>
                    {stream.isLive && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        LIVE
                      </Badge>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {stream.viewers.toLocaleString()}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {stream.title}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {stream.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Disfruta del mejor entretenimiento deportivo en vivo
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stream;