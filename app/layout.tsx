import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const syne = Syne({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kingsword CHurch",
  description: "Home of the Supernatural!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={syne.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}