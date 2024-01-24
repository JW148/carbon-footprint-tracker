import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import NavBar from "@/app/ui/navbar/navbar";
import Footer from "@/app/ui/footer/footer";

export const metadata = {
  title: "Carbon Footprint Tracker",
  description: "RunMDC Carbon Footprint Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NavBar />
        {children}
        <Footer />

      </body>
    </html>
  );
}
