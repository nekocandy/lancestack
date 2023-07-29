import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    "Hello world"
  );
}
