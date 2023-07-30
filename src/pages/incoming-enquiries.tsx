import { match } from "ts-pattern";
import { api } from "~/utils/api";

export default function IncomingEnquiriesPage() {
  const incomingEnquiries = api.lancer.incomingEnquiries.useQuery();
  const acceptProjectMutation = api.lancer.createProject.useMutation();

  async function acceptProject(id: string) {
    await acceptProjectMutation.mutateAsync({ enquiryId: id });
    alert("Project accepted!");
    await incomingEnquiries.refetch();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Incoming Enquiries</h1>

      <div className="grid grid-cols-4 gap-4">
        {match(incomingEnquiries)
          .with({ status: "loading" }, () => <div>Loading</div>)
          .with({ status: "success" }, ({ data }) => {
            if (data.length === 0) return <div>No enquiries yet!</div>;
            else
              return data.map((enquiry) => {
                return (
                  <div
                    key={enquiry.id}
                    className="flex flex-col gap-4 rounded-lg border-2 border-[#C57EFC] bg-[#242938] px-4 py-6"
                  >
                    <div className="flex items-center gap-2">
                      <div>By:</div>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={enquiry.user.image!}
                        alt=""
                      />
                      <div>{enquiry.user.name}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold underline">
                        What to Build:
                      </span>
                      {enquiry.whatToBuild}
                    </div>

                    <div className="flex items-center gap-2 ">
                      <span className="font-bold underline">Time:</span>
                      {enquiry.timeFrame}
                    </div>

                    <div>
                      <button
                        onClick={() => void acceptProject(enquiry.id)}
                        className="rounded-md bg-[#908FAD] px-4 py-1 text-white"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                );
              });
          })
          .with({ status: "error" }, () => <div>Error!</div>)
          .exhaustive()}
      </div>
    </div>
  );
}
