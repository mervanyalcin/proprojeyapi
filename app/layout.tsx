import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Container from "./components/Container";
import ToastProvider from "./ToastProvider";
import SmoothScroll from "./components/LenisProvider";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const inter = Inter({ subsets: ["latin"] });
// const raleway = Raleway({ subsets: ["latin"] });
// const noto_sans = Noto_Sans({ subsets: ["latin"] });
// const caveat = Caveat({ subsets: ["latin"] });
// const manroope = Manrope({ subsets: ["greek"] })

export const metadata: Metadata = {
  title: "Proproje Yapı",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
      </head>

      <body className={`text-cabin antialiased`}>
        <Navbar />

        <SmoothScroll>
          <ToastProvider>
            <div className="pt-20 bg-themeColorSec">
              {children}
            </div>
          </ToastProvider>
        </SmoothScroll>



        <div className="bg-themeColorSec py-12" id='footer'>

          <Container>
            <div className="flex justify-center text-themeColorThird font-bold bg-themeColorOne px-10 py-10 rounded-3xl">
              <p className="">Copyright © PROPROJEYAPI. Tasarımcısı Mervan Yalçın</p>
            </div>
          </Container>

        </div>
      </body>
    </html >
  );
}
