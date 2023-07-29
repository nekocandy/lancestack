import { type PropsWithChildren } from "react";

export default function LoginLayout({children}: PropsWithChildren) {
  return <div className="h-screen bg-[#05070E] flex items-center justify-center text-white">
    {children}
  </div>
}
