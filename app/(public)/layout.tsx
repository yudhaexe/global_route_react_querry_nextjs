'use client'
import { Container } from "@mui/material";
import "../../styles/globals.css";
import Navbar from "@/components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <div>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <Container>{children}</Container>
      </QueryClientProvider>
    </div>
  );
}
