import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";

export function createWrapper() {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return { wrapper, queryClient };
}
