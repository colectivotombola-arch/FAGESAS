import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FageBot from "./pages/FageBot";
import Casino from "./pages/Casino";
import Stream from "./pages/Stream";
import Wallet from "./pages/Wallet";
import Tombola from "./pages/Tombola";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fagebot" element={<FageBot />} />
          <Route path="/casino" element={<Casino />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/tombola" element={<Tombola />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
