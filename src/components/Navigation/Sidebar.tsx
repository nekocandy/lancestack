import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
    name: "Ongoing Lancing",
    path: "/ongoing",
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
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated" && router.pathname !== "/login") {
      return void router.push("/login");
    }
  }, [router, session]);

  return (
    <div
      className="flex h-full flex-col gap-10 rounded-xl px-4 py-6"
      style={{
        background: "linear-gradient(135deg, #242938 0%, #635DAA 100%)",
      }}
    >
      <Link href="/home">
        <div className="h-14 w-14 rounded-full bg-green-400"></div>
      </Link>
      {ROUTES.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          title={route.name}
          className={clsx(
            "flex items-center justify-center rounded-full bg-[#908FAD] p-2",
            router.pathname === route.path &&
              "ring-4 ring-[#908FAD] ring-offset-2 ring-offset-current"
          )}
        >
          <Icon icon={route.icon} className="h-6 w-6" />
        </Link>
      ))}
    </div>
  );
}
