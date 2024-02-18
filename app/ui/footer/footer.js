"use client";

import Link from "next/link";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex py-6 border-t-4 mt-10">
      <div className="flex-none px-10">
        <p>
          Interested in running with Mynyddwyr De Cymru? Find out how to join us
          <Link
            href="https://runmdc.org.uk/join-mdc/"
            className="font-semibold pl-1"
          >
            here
          </Link>
        </p>
      </div>

      <div className="flex-auto text-center m-auto"></div>

      <div className="flex-none px-10">
        <p className="flex items-center gap-2">
          Find us on Facebook
          <Link
            href="https://www.facebook.com/groups/145072302246575/"
            title="Link to Run MDC Facebook Page"
            className="text-2xl"
          >
            <FaFacebook />
          </Link>
        </p>
      </div>
    </div>
  );
}
