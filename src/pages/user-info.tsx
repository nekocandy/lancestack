import { type GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import PrimaryProfile from "~/components/UserInfo/PrimaryProfile";
import { getServerAuthSession } from "~/server/auth";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
export default function UserInfoPage() {
  const session = useSession();

  return (
    <div className="mx-auto flex h-full max-w-5xl flex-col justify-between">
      <h1 className="text-2xl font-bold">User Info</h1>

      <div
        className="flex flex-col items-center gap-8 rounded-xl border-2 border-[#BD60B7] bg-[#131621] bg-contain bg-bottom bg-no-repeat px-10 py-8"
        style={{
          backgroundImage: "url(/bg/card.png)",
        }}
      >
        <div className="flex flex-col gap-4 items-center">
          <img className="h-32 w-32 rounded-full" src={session.data?.user.image ?? "https://pycz.dev/favicon.svg"} alt="" />
          <div>{session.data?.user.name}</div>
        </div>


        <div>
          <PrimaryProfile />
        </div>
      </div>

      <div></div>
    </div>
  );
}
