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
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      return void router.push("/user-info");
    }
  }, [router, session]);

  async function onAuthClicked() {
    if (session.status === "unauthenticated") {
      await signIn("github");
    }
  }

  return (
    <LoginLayout>
      <div
        className="flex flex-col items-center gap-8 rounded-xl border-2 border-[#BD60B7] bg-[#131621] bg-contain bg-bottom bg-no-repeat px-10 py-8"
        style={{
          backgroundImage: "url(/bg/card.png)",
        }}
      >
        <div>Welcome to LanceStack!</div>

        <div
          className="h-16 w-16 rounded-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/logo.png)",
          }}
        ></div>

        <div>
          <button
            onClick={() => void onAuthClicked()}
            className="flex items-center justify-between gap-4 rounded-full border-2 border-[#BD60B7] bg-[#242938] py-1 pl-12 pr-1 text-sm"
          >
            <div></div>
            {match(session)
              .with({ status: "authenticated" }, () => (
                <div>
                  <span>Hello {session.data!.user.name}</span>
                </div>
              ))
              .with({ status: "unauthenticated" }, () => "Login with Github")
              .with({ status: "loading" }, () => "Loading")
              .exhaustive()}

            <div className="rounded-full bg-[#05070E] p-2">
              <Icon
                className="h-5 w-5 text-white"
                icon={"tabler:brand-github"}
              />
            </div>
          </button>
        </div>
      </div>
    </LoginLayout>
  );
}
