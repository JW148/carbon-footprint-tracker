"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

//map of links to display in the navbar
const links = [
  { name: "Stats", href: "/stats" },
  { name: "Events", href: "/events" },
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
              "flex mx-4 items-center hoverNav navBar_size",
              {
                "border-b-2 border-black": pathname === link.href,
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
