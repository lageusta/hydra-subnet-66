import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Hydra - Bittensor Liquidity Subnet",
  description: "Subnet 66 - Alpha bandwidth rights direct liquidity across Bittensor subnets through miner competition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${poppins.variable}`}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased font-poppins">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
