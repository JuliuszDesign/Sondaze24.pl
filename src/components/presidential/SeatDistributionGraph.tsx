
import React from "react";
import { SeatDistribution } from "./types";
import { cn } from "@/lib/utils";

interface SeatDistributionGraphProps {
  data: SeatDistribution;
}

export const SeatDistributionGraph: React.FC<SeatDistributionGraphProps> = ({ data }) => {
  const rulingCoalitionParties = data.parties.filter(party => party.coalition === "ruling");
  const oppositionParties = data.parties.filter(party => party.coalition === "opposition");
  
  // Sort parties by seats in descending order
  const sortedRulingParties = [...rulingCoalitionParties].sort((a, b) => b.seats - a.seats);
  const sortedOppositionParties = [...oppositionParties].sort((a, b) => b.seats - a.seats);

  return (
    <div className="w-full bg-[#111] text-white p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-2 text-purple-300">
        Podział Mandatów
      </h2>
      <p className="text-center text-sm mb-4 text-purple-200">
        {data.totalSeats} mandatów daje większość
      </p>
      
      {/* Horizontal bar visualization */}
      <div className="flex w-full h-12 mb-6">
        {data.parties.map((party, index) => {
          const widthPercentage = (party.seats / data.totalSeats) * 100;
          return (
            <div 
              key={index}
              className="h-full flex items-center justify-center text-xs font-bold"
              style={{ 
                width: `${widthPercentage}%`, 
                backgroundColor: party.color 
              }}
            >
              <div className="flex flex-col items-center">
                <span>{party.name}</span>
                <span>{party.seats}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mb-6">
        {data.parties.map((party, index) => (
          <div key={index} className="flex items-center gap-1">
            <div 
              className="w-4 h-4" 
              style={{ backgroundColor: party.color }}
            ></div>
            <span className="text-xs">{party.name}</span>
          </div>
        ))}
      </div>
      
      {/* Coalition vs Opposition */}
      <div className="flex border-t border-gray-700 pt-3">
        <div className="w-1/2 pr-2">
          <h3 className="text-center text-lg text-purple-300 mb-2">Koalicja Rządząca</h3>
          <p className="text-center">{data.rulingCoalitionTotal}</p>
          <div className="mt-3">
            {sortedRulingParties.map((party, index) => (
              <div key={index} className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3" 
                    style={{ backgroundColor: party.color }}
                  ></div>
                  <span>{party.name}</span>
                </div>
                <span>{party.seats}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-px bg-gray-500 mx-2"></div>
        
        <div className="w-1/2 pl-2">
          <h3 className="text-center text-lg text-purple-300 mb-2">Opozycja</h3>
          <p className="text-center">{data.oppositionTotal}</p>
          <div className="mt-3">
            {sortedOppositionParties.map((party, index) => (
              <div key={index} className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3" 
                    style={{ backgroundColor: party.color }}
                  ></div>
                  <span>{party.name}</span>
                </div>
                <span>{party.seats}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
