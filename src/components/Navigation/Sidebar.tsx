import { Icon } from "@iconify/react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

interface Route {
  name: string;
  path: string;
  icon: string;
}

const ROUTES: Route[] = [
  {
    name: "Update Profile",
    path: "/user-info",
    icon: "tabler:user",
  },
  {
    name: "Incoming Enquiries",
    path: "/incoming-enquiries",
    icon: "tabler:inbox",
  },
  {
    name: "Responded Enquiries",
    path: "/responded-enquiries",
    icon: "tabler:message-2-check",
  },
  {
    name: "Project Progress",
    path: "/project-progress",
    icon: "tabler:loader-3",
  },
  {
    name: "Transaction History",
    path: "/transaction-history",
    icon: "tabler:history",
  },
];

export default function Sidebar() {
  const router = useRouter();
  return (
    <div
      className="flex h-full flex-col gap-10 rounded-xl px-4 py-6"
      style={{
        background: "linear-gradient(135deg, #242938 0%, #635DAA 100%)",
      }}
    >
      <div className="h-14 w-14 bg-green-400 rounded-full"></div>
      {ROUTES.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          title={route.name}
          className={clsx(
            "rounded-full bg-[#908FAD] p-2 flex items-center justify-center",
            router.pathname === route.path && "ring-4 ring-[#908FAD] ring-offset-2 ring-offset-current"
          )}
        >
          <Icon icon={route.icon} className="h-6 w-6" />
        </Link>
      ))}
    </div>
  );
}
