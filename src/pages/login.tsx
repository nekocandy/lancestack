import { Icon } from "@iconify/react";
import { type GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { match } from "ts-pattern";
import LoginLayout from "~/components/Layout/Login";
import { getServerAuthSession } from "~/server/auth";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

export default function Login() {
  const router = useRouter()
  const session = useSession();

  useEffect(() => {
    if(session.status === "authenticated") {
        return void router.push("/user-info")
    }
  }, [router, session])

  async function onAuthClicked() {
    if(session.status === "unauthenticated") {
      await signIn("github");
    }
  }

  return <LoginLayout>
    <div className="bg-[#131621] flex flex-col gap-8 items-center border-2 border-[#BD60B7] px-10 py-8 rounded-xl bg-no-repeat bg-bottom bg-contain" style={{
      backgroundImage: "url(/bg/card.png)"
    }}>
      <div>Welcome to WeLance!</div>

    <div className="h-16 w-16 rounded-full bg-pink-300"></div>

      <div>
        <button
          onClick={() => void onAuthClicked()}
        className="flex gap-4 items-center bg-[#242938] rounded-full pl-12 pr-1 py-1 border-2 border-[#BD60B7] text-sm justify-between">
        <div></div>
        {match(session)
            .with({ status: "authenticated" }, () => (
              <div>
                <span>Hello {session.data!.user.name}</span>
              </div>
            ))
            .with({ status: "unauthenticated" }, () => (
                "Login with Github"
            ))
            .with({ status: "loading" }, () => "Loading")
            .exhaustive()}

            <div className="bg-[#05070E] rounded-full p-2">
              <Icon className="text-white h-5 w-5" icon={"tabler:brand-github"} />
            </div>
        </button>
        </div>
    </div>
  </LoginLayout>
}
