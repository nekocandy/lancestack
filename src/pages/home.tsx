import { type GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { match } from "ts-pattern";
import DetailsCard from "~/components/Home/DetailsCard";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

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

  const availableLancers = api.user.getLancers.useQuery();

  return (
    <div className="mx-auto flex h-full max-w-[100rem] flex-col gap-8">
      <h1 className="text-xl font-bold">Hello {session.data?.user.name}!</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 h-fit w-full rounded-lg bg-[#242938] p-6">
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

        <div className="col-span-5 flex flex-col gap-4 overflow-y-auto">
          <h1 className="text-xl font-bold">
            Available Lancers ({availableLancers.data?.length})
          </h1>
          {match(availableLancers)
            .with({ status: "loading" }, () => <div>Loading...</div>)
            .with({ status: "error" }, () => <div>Error!</div>)
            .with({ status: "success" }, ({ data }) =>
              data.map((lancer) => (
                <div
                  className="flex items-center gap-8 bg-[#131621] p-4 rounded-md"
                  key={lancer.userId}
                >
                  <div>
                    <img
                      className="h-20 w-20 rounded-full"
                      src={lancer.user.image!}
                      alt={`${lancer.user.name}'s PFP`}
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="w-fit rounded-full bg-[#908FAD] px-4 py-1 text-[#05070E]">
                      {lancer.user.name}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-fit rounded-md bg-[#242938] px-2 py-1 text-[#C57EFC]">
                        {lancer.primaryProfile}
                      </div>
                      <div className="w-fit rounded-md bg-[#242938] px-2 py-1 text-[#C57EFC]">
                        {lancer.techStack}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
            .exhaustive()}
        </div>
      </div>
    </div>
  );
}
