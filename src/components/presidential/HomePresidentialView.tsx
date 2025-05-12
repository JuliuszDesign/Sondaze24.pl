
import React, { useState } from "react";
import { Header } from "./Header";
import { ViewToggle } from "./ViewToggle";
import { PollCarousel } from "./PollCarousel";
import { ViewType } from "./types";
import { presidentialPolls, partyPolls, seatDistributionData } from "./mockData";
import { SeatDistributionGraph } from "./SeatDistributionGraph";

const HomePresidentialView: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("presidential");

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const polls = currentView === "presidential" ? presidentialPolls : partyPolls;

  return (
    <div className="w-full bg-white">
      <Header siteName="Sondaze24.pl" />
      <ViewToggle onViewChange={handleViewChange} />
      <PollCarousel polls={polls} />
      
      {/* Only show seat distribution for party view */}
      {currentView === "party" && (
        <div className="px-4 py-6 bg-[#EEEAF3]">
          <SeatDistributionGraph data={seatDistributionData} />
        </div>
      )}
    </div>
  );
};

export default HomePresidentialView;
