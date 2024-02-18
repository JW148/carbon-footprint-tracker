import { Providers } from "@/app/providers";
import { inter } from "@/app/ui/fonts";
import Footer from "@/app/ui/footer/footer";
import "@/app/ui/global.css";
import NavBar from "@/app/ui/navbar/navbar";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "MDC | Carbon Footprint Tracker",
  description: "RunMDC Carbon Footprint Tracker",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <NavBar />
          {children}
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
