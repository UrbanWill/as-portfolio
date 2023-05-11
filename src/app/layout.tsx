import "./globals.css";
import { Inter } from "next/font/google";

// Components
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crypto Portfolio",
  description: "Token portfolio tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-100`}>
        <Navbar />
        <div className="sm:p-5 p-2">{children}</div>
      </body>
    </html>
  );
}
