
import React from "react";
import { PollData } from "./types";
import { CandidateItem } from "./CandidateItem";

interface PollGraphProps {
  poll: PollData;
}

export const PollGraph: React.FC<PollGraphProps> = ({ poll }) => {
  return (
    <div className="w-full">
      <div className="text-[#2C2233] text-2xl leading-none tracking-[0px] w-full gap-2.5 font-normal bg-white px-4 py-3">
        {poll.title}
      </div>
      {poll.candidates.map((candidate, index) => (
        <div
          key={`${candidate.name}-${index}`}
          className="flex w-full gap-4 overflow-hidden bg-white px-4 py-3"
        >
          <CandidateItem candidate={candidate} />
        </div>
      ))}
    </div>
  );
};
