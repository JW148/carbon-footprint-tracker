import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import NavBar from "@/app/ui/navbar/navbar";
import Footer from "@/app/ui/footer/footer";
import { Providers } from "@/app/providers";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Carbon Footprint Tracker",
  description: "RunMDC Carbon Footprint Tracker",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
