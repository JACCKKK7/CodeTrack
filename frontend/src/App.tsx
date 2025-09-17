import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { authAPI } from "./lib/api";
import Index from "./pages/Index";
import Problems from "./pages/Problems";
import Problem from "./pages/Problem";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Initialize auth session on app mount */}
        {(() => {
          function AuthInitializer() {
            useEffect(() => {
              const token = localStorage.getItem("token");
              if (!token) return;
              authAPI
                .getMe()
                .then((data) => {
                  if (data?.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                  }
                })
                .catch(() => {
                  // invalid/expired token -> clear stored auth
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                });
            }, []);
            return null;
          }
          return <AuthInitializer />;
        })()}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/practice" element={<Problems />} />
          <Route path="/problem/:id" element={<Problem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
