import React from "react";
import { Candidate } from "./types";

interface CandidateItemProps {
  candidate: Candidate;
}

export const CandidateItem: React.FC<CandidateItemProps> = ({ candidate }) => {
  return (
    <div className="flex min-w-60 w-full gap-[40px_68px] justify-between flex-1 shrink basis-[0%]">
      <div className="flex items-center gap-4">
        <div className="justify-center items-center border border-[color:var(--UI-Colors-Muted-Lilac,#D6CEE4)] self-stretch flex min-h-[52px] gap-2.5 w-[52px] h-[52px] my-auto px-3 rounded-[1000px] border-solid">
          <div className="self-stretch flex w-2.5 items-center overflow-hidden my-auto">
            <img
              src={candidate.imageUrl}
              className="aspect-[0.71] object-contain w-2.5 fill-[#D6CEE4] self-stretch my-auto"
              alt={candidate.name}
            />
          </div>
        </div>
        <div className="self-stretch text-sm text-[#2C2233] font-medium tracking-[0.1px] leading-none w-[156px] my-auto py-1">
          <div className="text-[#2C2233] text-sm leading-[20px)]">
            {candidate.name}
          </div>
          <div className="rounded flex min-h-5 max-w-full w-[156px] bg-[#5A4B91] mt-1" />
        </div>
      </div>
      <div className="text-[#2C2233] text-4xl leading-none tracking-[0px] font-normal whitespace-nowrap">
        {candidate.percentage}%
      </div>
    </div>
  );
};
