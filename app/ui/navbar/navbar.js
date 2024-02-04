import NavLinks from "@/app/ui/navbar/nav-links";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/headerLogo.jpg";

import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

export default function NavBar() {
  return (
    <div className="flex py-3">
      <div className="flex-none px-10">
        <Link href="/">
          <Image
            src={Logo}
            alt="Carbon Footprint Tracker Logo"
            width={210}
            height={60}
          />
        </Link>
      </div>
      <div className="flex-auto text-center m-auto">
        <Link href="/" className="navBar_size">
          MDC Carbon Footprint Tracker
        </Link>
      </div>
      <div className="flex px-4">
        <NavLinks />
        <form
          action={async () => {
            "use server";
            await signOut({ callbackUrl: "http://localhost:3000/" });
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
