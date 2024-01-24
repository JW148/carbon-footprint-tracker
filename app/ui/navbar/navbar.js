import NavLinks from "@/app/ui/navbar/nav-links";


import Link from "next/link";
import Image from "next/image";
import Logo from '@/public/headerLogo.jpg';

export default function NavBar() {
  return (
    <div className="flex py-3">

      <div className="flex-none px-10">
        <Link href= "/">
          <Image
            src={Logo}
            alt="Carbon Footprint Tracker Logo"
            width={210}
            height={60}
          />
        </Link>

      </div>
      <div className="flex-auto text-center m-auto">
        <Link href= "/" className="navBar_size">
            MDC Carbon Footprint Tracker
        </Link>
      </div>
      <div className="flex px-4">
        <NavLinks />
      </div>
    </div>
  );
}
