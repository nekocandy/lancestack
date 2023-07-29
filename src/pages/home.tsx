import { type GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import DetailsCard from "~/components/Home/DetailsCard";
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

export default function Home() {
  const session = useSession();
  return (
    <div className="mx-auto flex h-full max-w-[100rem] flex-col gap-8">
      <h1 className="text-xl font-bold">Hello {session.data?.user.name}!</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5 w-full rounded-lg bg-[#242938] p-6">
          <div className="grid grid-cols-2 gap-4">
            <DetailsCard
              title="Ongoing Projects"
              value="02"
              icon="tabler:loader-2"
            />
            <DetailsCard
              title="Completed Projects"
              value="11"
              icon="tabler:circle-check"
            />
            <div className="col-span-2 w-full">
              <DetailsCard
                title="Total Revenue Generated"
                value="$3194.45"
                icon="tabler:coin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
