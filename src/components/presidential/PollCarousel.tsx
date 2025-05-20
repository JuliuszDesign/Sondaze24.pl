
import React, { useState, useRef, useEffect } from "react";
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

  // Handle scroll events to update active tab
  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const itemWidth = carouselRef.current.offsetWidth;
      const newIndex = Math.round(scrollPosition / itemWidth);
      
      if (newIndex !== activeTabIndex) {
        setActiveTabIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      return () => carousel.removeEventListener("scroll", handleScroll);
    }
  }, [activeTabIndex]);

  return (
    <div className="flex flex-col w-full">
      <CarouselNavigation
        tabs={polls.map((poll) => poll.title)}
        activeTabIndex={activeTabIndex}
        onTabChange={handleTabChange}
      />
      <div
        ref={carouselRef}
        className="flex w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {polls.map((poll, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 snap-center"
          >
            <PollGraph poll={poll} />
          </div>
        ))}
      </div>
    </div>
  );
};
