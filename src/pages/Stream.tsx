import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Play, 
  Users, 
  Eye, 
  Search, 
  Heart, 
  Star,
  Tv,
  Film,
  Radio,
  Clock,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Stream = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("live");

  const liveChannels = [
    {
      id: 1,
      name: "ESPN Sports",
      category: "Deportes",
      viewers: 45672,
      thumbnail: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=225&fit=crop&crop=center",
      isLive: true,
      quality: "HD"
    },
    {
      id: 2,
      name: "CNN Internacional",
      category: "Noticias", 
      viewers: 32198,
      thumbnail: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=225&fit=crop&crop=center",
      isLive: true,
      quality: "HD"
    },
    {
      id: 3,
      name: "Discovery Channel",
      category: "Documentales",
      viewers: 18453,
      thumbnail: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=225&fit=crop&crop=center",
      isLive: true,
      quality: "4K"
    }
  ];

  const movies = [
    {
      id: 1,
      title: "Acción Extrema",
      year: "2024",
      rating: 8.7,
      thumbnail: "https://images.unsplash.com/photo-1489599063714-2780eb44ccdd?w=300&h=450&fit=crop&crop=center",
      genre: "Acción"
    },
    {
      id: 2,
      title: "Misterio Urbano",
      year: "2024",
      rating: 7.9,
      thumbnail: "https://images.unsplash.com/photo-1518930259200-dc7d34d4b71f?w=300&h=450&fit=crop&crop=center",
      genre: "Thriller"
    }
  ];

  const series = [
    {
      id: 1,
      title: "Serie Premium",
      season: "T1",
      episodes: 12,
      rating: 9.2,
      thumbnail: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=450&fit=crop&crop=center",
      genre: "Drama"
    }
  ];

  const radios = [
    {
      id: 1,
      name: "FageRadio Pop",
      listeners: 2847,
      genre: "Pop",
      isLive: true
    },
    {
      id: 2,
      name: "FageRadio Rock",
      listeners: 1956,
      genre: "Rock",
      isLive: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
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
                <h1 className="text-4xl font-orbitron font-bold text-primary">
                  📺 FageStream Ultra
                </h1>
                <p className="text-muted-foreground">
                  Streaming premium con TV en vivo, películas, series y radio
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar contenido..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">67 canales en vivo</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">12,847 espectadores activos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Navigation Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Tv className="h-4 w-4" />
              TV en Vivo
            </TabsTrigger>
            <TabsTrigger value="movies" className="flex items-center gap-2">
              <Film className="h-4 w-4" />
              Películas
            </TabsTrigger>
            <TabsTrigger value="series" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Series
            </TabsTrigger>
            <TabsTrigger value="radio" className="flex items-center gap-2">
              <Radio className="h-4 w-4" />
              Radio
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favoritos
            </TabsTrigger>
          </TabsList>

          {/* Live TV */}
          <TabsContent value="live">
            <div className="space-y-6">
              <h2 className="text-2xl font-orbitron font-bold text-primary">
                Canales en Vivo
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveChannels.map((channel) => (
                  <Card key={channel.id} className="bg-card border-border card-hover cursor-pointer overflow-hidden">
                    <div className="relative">
                      <img 
                        src={channel.thumbnail}
                        alt={channel.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button size="lg" className="bg-primary/90 hover:bg-primary">
                          <Play className="h-5 w-5 mr-2" />
                          Ver Canal
                        </Button>
                      </div>
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        LIVE
                      </Badge>
                      <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                        {channel.quality}
                      </Badge>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {channel.viewers.toLocaleString()}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-1">
                        {channel.name}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {channel.category}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Movies */}
          <TabsContent value="movies">
            <div className="space-y-6">
              <h2 className="text-2xl font-orbitron font-bold text-primary">
                Películas Premium
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {movies.map((movie) => (
                  <Card key={movie.id} className="bg-card border-border card-hover cursor-pointer overflow-hidden">
                    <div className="relative">
                      <img 
                        src={movie.thumbnail}
                        alt={movie.title}
                        className="w-full h-60 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button className="bg-primary/90 hover:bg-primary">
                          <Play className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400" />
                        {movie.rating}
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-semibold text-foreground text-sm mb-1">
                        {movie.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{movie.year} • {movie.genre}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Series */}
          <TabsContent value="series">
            <div className="space-y-6">
              <h2 className="text-2xl font-orbitron font-bold text-primary">
                Series Exclusivas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {series.map((serie) => (
                  <Card key={serie.id} className="bg-card border-border card-hover cursor-pointer overflow-hidden">
                    <div className="relative">
                      <img 
                        src={serie.thumbnail}
                        alt={serie.title}
                        className="w-full h-60 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button className="bg-primary/90 hover:bg-primary">
                          <Play className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-semibold text-foreground text-sm mb-1">
                        {serie.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{serie.season} • {serie.episodes} episodios</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Radio */}
          <TabsContent value="radio">
            <div className="space-y-6">
              <h2 className="text-2xl font-orbitron font-bold text-primary">
                Radio Online
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {radios.map((radio) => (
                  <Card key={radio.id} className="bg-card border-border card-hover cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Radio className="h-8 w-8 text-primary" />
                        {radio.isLive && (
                          <Badge className="bg-red-500 text-white">
                            EN VIVO
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {radio.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {radio.genre} • {radio.listeners} oyentes
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <Play className="h-4 w-4 mr-2" />
                        Escuchar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Favorites */}
          <TabsContent value="favorites">
            <div className="space-y-6">
              <h2 className="text-2xl font-orbitron font-bold text-primary">
                Tus Favoritos
              </h2>
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Agrega contenido a favoritos para verlo aquí
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Continue Watching Section */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl font-orbitron text-primary flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Continuar Viendo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Tu historial de reproducción aparecerá aquí
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stream;