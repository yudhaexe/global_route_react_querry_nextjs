import { Container } from "@mui/material";
import "../../styles/globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <Container>{children}</Container>
    </div>
  );
}
