import clsx from "clsx";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const OPTIONS = ["FullStack", "Mobile", "API", "Other"];

export default function PrimaryProfile() {
  const [selected, setSelected] = useState<
    "loading" | "FullStack" | "Mobile" | "API" | "Other"
  >("loading");

  const profileUpdateMutation = api.user.update.useMutation();

  async function selectedChanged(option: (typeof OPTIONS)[number]) {
    if (option === "loading") return;
    // @ts-expect-error typings not generated for option
    setSelected(option);

    const userData = await profileUpdateMutation.mutateAsync({
      primaryProfile: option,
    });

    if (userData) {
      alert("updated successfully");
    }
  }

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <h1>Primary Profile</h1>
      <div className="grid grid-cols-4 gap-2 rounded-lg border-8 border-[#908FAD]/30 px-2 py-2">
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
