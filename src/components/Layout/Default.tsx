import { type PropsWithChildren } from "react";
import Sidebar from "~/components/Navigation/Sidebar";

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen gap-4 px-6 py-8 bg-[#05070E] text-white">
      <Sidebar />

      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
