import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth-context";
import { LanguageProvider } from "@/context/language-context";
import { ChatbotWidget } from "@/components/ChatbotWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sode Sri Vadiraja Matha",
  description: "Official App for Vaibhavotsava Hackathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased bg-background text-white font-sans`}
      >
        <LanguageProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-center" richColors />
            <ChatbotWidget />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

