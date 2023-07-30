import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function EnquireLancerPage() {
  const router = useRouter();

  const [lancerId, setLancerId] = useState<string | null>(null);
  const [whatToBuild, setWhatToBuild] = useState<string>("");
  const [timeFrame, setTimeFrame] = useState<string>("");
  const [paymentRange, setPaymentRange] = useState<string>("");

  const enquireMutation = api.lancer.sendEnquiry.useMutation();

  useEffect(() => {
    if (!router.isReady) return;

    const { lancerId } = router.query;
    setLancerId(lancerId as string);
  }, [router]);

  async function enquireData() {
    if (!lancerId) return;
    if (
      whatToBuild.length === 0 ||
      timeFrame.length === 0 ||
      paymentRange.length === 0
    )
      return;

    const enquiryApiData = await enquireMutation.mutateAsync({
      lancerId,
      whatToBuild,
      timeFrame,
      budget: Number(paymentRange),
    });

    if (enquiryApiData) {
      alert("Enquiry sent successfully!");
      return await router.push("/home");
    }
  }

  if (!lancerId) return <div>Loading</div>;
  else {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold">Enquire Lancer</h1>
        </div>

        <div className="flex flex-col gap-6">
          <input
            className="w-1/2 rounded-md border-2 border-pink-600 bg-black px-4 py-2 placeholder:text-slate-400"
            placeholder="What do I need to build?"
            onChange={(e) => setWhatToBuild(e.target.value)}
            onKeyUp={(e) => setWhatToBuild(e.currentTarget.value)}
            onKeyDown={(e) => setWhatToBuild(e.currentTarget.value)}
          />
          <input
            className="w-1/2 rounded-md border-2 border-pink-600 bg-black px-4 py-2 placeholder:text-slate-400"
            placeholder="How much time frame am I expecting?"
            onChange={(e) => setTimeFrame(e.target.value)}
            onKeyUp={(e) => setTimeFrame(e.currentTarget.value)}
            onKeyDown={(e) => setTimeFrame(e.currentTarget.value)}
          />

          <input
            className="w-1/2 rounded-md border-2 border-pink-600 bg-black px-4 py-2 placeholder:text-slate-400"
            placeholder="How much payment range expected?"
            type="number"
            onChange={(e) => setPaymentRange(e.target.value)}
            onKeyUp={(e) => setPaymentRange(e.currentTarget.value)}
            onKeyDown={(e) => setPaymentRange(e.currentTarget.value)}
          />

          <button
            disabled={
              whatToBuild.length === 0 ||
              timeFrame.length === 0 ||
              paymentRange.length === 0
            }
            onClick={() => void enquireData()}
            className="self-start rounded-md bg-indigo-600/60 px-12 py-4 disabled:cursor-not-allowed disabled:bg-indigo-600/40"
          >
            Enquire
          </button>
        </div>
      </div>
    );
  }
}
