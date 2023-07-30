import { useRouter } from "next/router";
import { match } from "ts-pattern";
import { api } from "~/utils/api";

export default function Ongoing() {
  const router = useRouter();
  const myCommissions = api.lancer.myOngoingCommissions.useQuery();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold underline">Ongoing</h1>

      <div className="grid grid-cols-3">
        {match(myCommissions)
          .with({ status: "loading" }, () => <p>Loading...</p>)
          .with({ status: "error" }, () => <p>Error</p>)
          .with({ status: "success", data: [] }, () => <p>Nothing ongoing</p>)
          .with({ status: "success" }, ({ data }) => {
            return data.map((commission) => {
              const enquiry = commission.enquiry;
              return (
                <div
                  key={commission.id}
                  className="flex flex-col gap-4 rounded-lg border-2 border-[#C57EFC] bg-[#242938] px-4 py-6"
                >
                  <div className="flex items-center gap-2">
                    <div>By:</div>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={commission.lancer.id}
                      alt=""
                    />
                    <div>{commission.lancer.id}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold underline">What to Build:</span>
                    {enquiry.whatToBuild}
                  </div>

                  <div className="flex items-center gap-2 ">
                    <span className="font-bold underline">Time:</span>
                    {enquiry.timeFrame}
                  </div>

                  <div>
                    <button
                      onClick={() =>
                        void router.push(`/payment/lance/${commission.id}`)
                      }
                      className="rounded-md bg-[#908FAD] px-4 py-1 text-white"
                    >
                      {match(commission.status)
                        .with("pending", () => "Pay")
                        .with("paid", () => "Paid")
                        .run()}
                    </button>
                  </div>
                </div>
              );
            });
          })
          .exhaustive()}
      </div>
    </div>
  );
}
