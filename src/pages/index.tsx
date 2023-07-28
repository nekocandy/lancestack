import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { api } from "~/utils/api";

export default function Home() {
  const session = useSession();

  useEffect(() => {
    console.log(session)
  }, [session])

  return (
    <div>
      <h1>Auth</h1>
      <button className="bg-red-400 p-8" onClick={() => void signIn("github")}>Sign in</button>
    </div>
  );
}
