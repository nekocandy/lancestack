import { Icon } from "@iconify/react";

interface IDetailsCard {
  title: string;
  value: string;
  icon: string;
}

export default function DetailsCard({ title, value, icon }: IDetailsCard) {
  return (
    <div className="flex w-full rounded-lg bg-[#131621]">
      <div className="flex w-full flex-col gap-6 px-6 py-4">
        <div className="text-center text-[#908FAD] underline">{title}</div>

        <div className="rounded-full bg-black px-12 py-2 text-white text-center">
          {value}
        </div>
      </div>

      <div className="flex items-center justify-center rounded-r-lg bg-[#605AA4] px-8 py-8">
        <Icon icon={icon} className="h-8 w-8 text-[#FF9254]" />
      </div>
    </div>
  );
}
