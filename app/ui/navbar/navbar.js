import NavLinks from "@/app/ui/navbar/nav-links";

export default function NavBar() {
  return (
    <div className="flex bg-slate-400">
      <div className="flex-none w-14 h-14 bg-slate-800 text-white">
        <p className="text-center">Logo</p>
      </div>
      <div className="flex-auto"></div>
      <div className="flex">
        <NavLinks />
      </div>
    </div>
  );
}
