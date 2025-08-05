import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import FageBot from "./pages/FageBot";
import Casino from "./pages/Casino";
import Stream from "./pages/Stream";
import Wallet from "./pages/Wallet";
import Tombola from "./pages/Tombola";
import UserPanel from "./pages/UserPanel";
import AdminPanel from "./pages/AdminPanel";
import SystemOptimizer from "./pages/SystemOptimizer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/fagebot" element={
              <ProtectedRoute>
                <FageBot />
              </ProtectedRoute>
            } />
            <Route path="/casino" element={
              <ProtectedRoute>
                <Casino />
              </ProtectedRoute>
            } />
            <Route path="/stream" element={
              <ProtectedRoute>
                <Stream />
              </ProtectedRoute>
            } />
            <Route path="/wallet" element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            } />
            <Route path="/tombola" element={
              <ProtectedRoute>
                <Tombola />
              </ProtectedRoute>
            } />
            <Route path="/user-panel" element={
              <ProtectedRoute>
                <UserPanel />
              </ProtectedRoute>
            } />
            <Route path="/admin-panel" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
            <Route path="/system-optimizer" element={
              <ProtectedRoute>
                <SystemOptimizer />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
