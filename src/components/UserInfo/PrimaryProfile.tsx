import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const OPTIONS = ["FullStack", "Mobile", "API", "Other"];

export default function PrimaryProfile() {
  const [selected, setSelected] = useState<
    "loading" | "FullStack" | "Mobile" | "API" | "Other"
  >("loading");

  const userData = api.user.get.useQuery();
  const profileUpdateMutation = api.user.update.useMutation();

  async function selectedChanged(option: (typeof OPTIONS)[number]) {
    if (option === "loading") return;
    // @ts-expect-error typings not generated for option
    setSelected(option);

    const updatedUserData = await profileUpdateMutation.mutateAsync({
      primaryProfile: option,
    });

    if (updatedUserData) {
      alert("updated successfully");
    }
  }

  function fetchPrimaryProfile() {
    if (userData) {
      // @ts-expect-error state typings not generated for primary profile option
      setSelected(userData.data?.primaryProfile ?? "loading");
    }
  }

  useEffect(() => {
    if (userData.isFetching) return;

    if (userData.isFetched) {
      fetchPrimaryProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <h1>Primary Profile</h1>
      <div className="relative grid grid-cols-4 gap-2 rounded-lg border-8 border-[#908FAD]/30 px-2 py-2">
        <div
          className={clsx(
            !userData.isLoading ? "hidden" : "block",
            "absolute bottom-0 left-0 right-0 top-0 bg-slate-900/80",
            "flex items-center justify-center"
          )}
        >
          <Icon icon="tabler:loader-3" className="h-6 w-6 animate-spin" />
        </div>
        {OPTIONS.map((option) => (
          <button
            onClick={() => void selectedChanged(option)}
            className={clsx(
              "flex items-center justify-center px-4 py-2",
              selected !== option
                ? "bg-[#908FAD] text-black"
                : "bg-[#1C2135] text-[#908FAD]"
            )}
            key={option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
