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
  metadataBase: new URL("https://www.newcastleremovals.uk"),
  title: "Newcastle Removals | Trusted House & Office Removals",
  description:
    "Newcastle's most trusted removals company. House moves, office relocations, man & van, and packing services across Newcastle, Gateshead & Tyneside. Free quotes, same day available.",
  keywords:
    "removals newcastle, house removals, office removals, man and van newcastle, moving company newcastle, removals gateshead, removals tyneside",
  openGraph: {
    title: "Newcastle Removals | Trusted House & Office Removals",
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
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              window.smartlook||(function(d) {
                var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
                var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
                c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
              })(document);
              smartlook('init', 'a45602631ad33a33d938753e59ec193131138703', { region: 'eu' });
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
