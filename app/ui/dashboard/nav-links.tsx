"use client";

import {
  AdjustmentsHorizontalIcon,
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
const links = [
  { name: "Reports", href: "/dashboard", icon: ChartBarIcon },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: DocumentDuplicateIcon,
  },
  { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
  { name: "Events", href: "/dashboard/view-events", icon: CalendarIcon },
  { name: "View Managers", href: "/dashboard/manager", icon: UserIcon },

  { name: "Account", href: "/dashboard/account", icon: CogIcon },
  {
    name: "Settings",
    href: "/dashboard/manage-settings",
    icon: AdjustmentsHorizontalIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
