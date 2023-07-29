import clsx from "clsx";
import { useEffect, useState } from "react";

interface IPrimaryProfileProps {
  id: string;
}

const OPTIONS = ["FullStack", "Mobile", "API", "Other"];

export default function PrimaryProfile({ id }: IPrimaryProfileProps) {
  const [selected, setSelected] = useState<
    "loading" | "FullStack" | "Mobile" | "API" | "Other"
  >("loading");

  async function selectedChanged() {}

  useEffect(() => {
    void selectedChanged();
  }, [selected]);

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <h1>Primary Profile</h1>
      <div className="grid grid-cols-4 gap-2 rounded-lg border-8 border-[#908FAD]/30 px-2 py-2">
        {OPTIONS.map((option) => (
          <button
            // @ts-expect-error typings not generated for option
            onClick={() => setSelected(option)}
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
