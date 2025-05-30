
import React, { useRef, useEffect } from "react";

interface CarouselNavigationProps {
  tabs: string[];
  activeTabIndex: number;
  onTabChange: (index: number) => void;
}

export const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  tabs,
  activeTabIndex,
  onTabChange,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Center the active tab on change
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeTab = container.children[activeTabIndex] as HTMLElement;
      
      if (activeTab) {
        const containerWidth = container.offsetWidth;
        const tabWidth = activeTab.offsetWidth;
        const scrollLeft = activeTab.offsetLeft - containerWidth / 2 + tabWidth / 2;
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeTabIndex]);

  return (
    <div className="border border-[color:var(--UI-Colors-Muted-Lilac,#D6CEE4)] min-h-24 w-full bg-[#F7F4FA] py-3 border-solid">
      <div className="flex w-full flex-col text-xs text-[#2C2233] font-medium text-center tracking-[0.5px] leading-none">
        <div 
          ref={scrollContainerRef}
          className="items-center flex min-h-11 bg-[#F7F4FA] overflow-x-auto whitespace-nowrap scrollbar-hide"
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`text-[#2C2233] border-r border-r-[color:var(--UI-Colors-Muted-Lilac,#D6CEE4)] border-solid ${
                index === activeTabIndex
                  ? "text-sm leading-none tracking-[0.1px] self-stretch min-h-11 font-semibold my-auto px-4"
                  : "text-xs leading-[16px)] px-4"
              }`}
              onClick={() => onTabChange(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="flex w-full items-center gap-2.5 justify-center mt-3">
        <div className="self-stretch flex items-center gap-2 justify-center my-auto">
          {tabs.map((_, index) => (
            <div
              key={index}
              className={`${
                index === activeTabIndex
                  ? "bg-[#6D5DD3] self-stretch flex w-4 shrink-0 h-4 fill-[#6D5DD3]"
                  : index === activeTabIndex + 1
                  ? "bg-[#D6CEE4] self-stretch flex w-3 shrink-0 h-3 fill-[#D6CEE4]"
                  : "bg-[#D6CEE4] self-stretch flex w-2 shrink-0 h-2 fill-[#D6CEE4]"
              } my-auto rounded-[50%] cursor-pointer`}
              onClick={() => onTabChange(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
