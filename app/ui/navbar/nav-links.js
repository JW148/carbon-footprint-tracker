"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

//map of links to display in the navbar
const links = [
  { name: "Stats", href: "/stats" },
  { name: "Events", href: "/events" },
  { name: "Login", href: "/login" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex px-8 items-center hover:bg-sky-100 hover:text-blue-300 text-white",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}