import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { GlobalProvider } from "./context/context-provider";
import SessionProvider from "./SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GraphiOL App by Cyber Ducks",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <SessionProvider>
            <Header />
            {children}
            <Footer />
          </SessionProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
