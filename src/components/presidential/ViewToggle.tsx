import React, { useState } from "react";
import { ViewType } from "./types";

interface ViewToggleProps {
  onViewChange?: (view: ViewType) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ onViewChange }) => {
  const [activeView, setActiveView] = useState<ViewType>("presidential");

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
    if (onViewChange) {
      onViewChange(view);
    }
  };

  return (
    <div className="items-stretch border-[color:var(--UI-Colors-Muted-Lilac,#D6CEE4)] flex w-full flex-col text-sm whitespace-nowrap text-center tracking-[0.1px] leading-none justify-center bg-[#EEEAF3] px-4 py-6 border-0 border-solid">
      <div className="justify-between items-center border-[color:var(--UI-Colors-Muted-Lilac,#D6CEE4)] flex w-full gap-6 bg-white p-1 rounded-lg border-[0.5px] border-solid">
        <button
          className={`flex-1 py-2 px-4 rounded-md ${
            activeView === "presidential"
              ? "bg-[#5A4B91] text-white"
              : "bg-transparent text-[#6B617B]"
          }`}
          onClick={() => handleViewChange("presidential")}
        >
          PREZYDENCKIE
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md ${
            activeView === "party"
              ? "bg-[#5A4B91] text-white"
              : "bg-transparent text-[#6B617B]"
          }`}
          onClick={() => handleViewChange("party")}
        >
          PARTYJNE
        </button>
      </div>
    </div>
  );
};
