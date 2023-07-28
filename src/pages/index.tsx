import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { match } from "ts-pattern";

export default function Home() {
  const session = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <div>
      {match(session)
        .with({ status: "authenticated" }, () => (
          <div>
            <h1>Hello {session.data!.user.name}</h1>
            <button className="bg-red-400 p-8" onClick={() => void signOut()}>
              Sign out
            </button>
          </div>
        ))
        .with({ status: "unauthenticated" }, () => (
          <button
            className="bg-blue-400 p-8"
            onClick={() => void signIn("github")}
          >
            Sign in
          </button>
        ))
        .with({ status: "loading" }, () => <h1>Loading</h1>)
        .exhaustive()}
    </div>
  );
}
