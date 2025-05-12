import React, { useState, useRef } from "react";
import { PollGraph } from "./PollGraph";
import { CarouselNavigation } from "./CarouselNavigation";
import { PollData } from "./types";

interface PollCarouselProps {
  polls: PollData[];
}

export const PollCarousel: React.FC<PollCarouselProps> = ({ polls }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
    scrollToIndex(index);
  };

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const scrollAmount = index * carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="justify-center items-stretch border border-[color:var(--UI-Colors-Muted-Lilac,#D6CEE4)] flex w-full flex-col border-solid">
      <div
        ref={carouselRef}
        className="flex w-full items-center gap-3 overflow-x-auto scrollbar-hide"
        style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
      >
        {polls.map((poll, index) => (
          <div
            key={index}
            style={{ scrollSnapAlign: "start", flexShrink: 0 }}
          >
            <PollGraph poll={poll} />
          </div>
        ))}
      </div>
      <CarouselNavigation
        tabs={polls.map((poll) => poll.title)}
        activeTabIndex={activeTabIndex}
        onTabChange={handleTabChange}
      />
    </div>
  );
};
