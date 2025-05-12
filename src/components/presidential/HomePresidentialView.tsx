import React, { useState } from "react";
import { Header } from "./Header";
import { ViewToggle } from "./ViewToggle";
import { PollCarousel } from "./PollCarousel";
import { ViewType } from "./types";
import { presidentialPolls, partyPolls } from "./mockData";

const HomePresidentialView: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("presidential");

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const polls = currentView === "presidential" ? presidentialPolls : partyPolls;

  return (
    <div className="max-w-[480px] w-full bg-white mx-auto">
      <Header siteName="Sondaze24.pl" />
      <ViewToggle onViewChange={handleViewChange} />
      <PollCarousel polls={polls} />
    </div>
  );
};

export default HomePresidentialView;
