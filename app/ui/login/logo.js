import { PiPersonSimpleRun } from "react-icons/pi";
import { inter, lusitana } from "@/app/ui/fonts";

export default function Logo() {
  return (
    <div
      className={`${inter.className} flex flex-row items-center leading-none text-white`}
    >
      <PiPersonSimpleRun className="h-16 w-16" />
      <p className="text-2xl pl-5">Run DMC</p>
    </div>
  );
}
