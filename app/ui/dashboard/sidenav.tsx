import AcmeLogo from "@/app/ui/acme-logo";
import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-amber-50">
      {/* Logo with a warm, welcoming feel */}
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-brown-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-cream-100 md:w-40">
          <AcmeLogo />
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-cream-50 md:block"></div>

        {/* Sign Out Button with Coffee Vibes */}
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-cream-100 p-3 text-sm font-medium hover:bg-amber-100 hover:text-brown-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6 text-brown-600" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
