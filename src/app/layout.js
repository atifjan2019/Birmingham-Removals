import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata = {
  title: "Swift Removals Newcastle | Trusted House & Office Removals",
  description:
    "Newcastle's most trusted removals company. House moves, office relocations, man & van, and packing services across Newcastle, Gateshead & Tyneside. Free quotes, same day available.",
  keywords:
    "removals newcastle, house removals, office removals, man and van newcastle, moving company newcastle, removals gateshead, removals tyneside",
  openGraph: {
    title: "Swift Removals Newcastle | Trusted House & Office Removals",
    description:
      "Newcastle's most trusted removals company. Free quotes, same day available.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
