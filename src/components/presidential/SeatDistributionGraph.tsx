
import React from "react";
import { SeatDistribution } from "./types";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface SeatDistributionGraphProps {
  data: SeatDistribution;
}

export const SeatDistributionGraph: React.FC<SeatDistributionGraphProps> = ({ data }) => {
  const rulingCoalitionParties = data.parties.filter(party => party.coalition === "ruling");
  const oppositionParties = data.parties.filter(party => party.coalition === "opposition");
  
  const sortedRulingParties = [...rulingCoalitionParties].sort((a, b) => b.seats - a.seats);
  const sortedOppositionParties = [...oppositionParties].sort((a, b) => b.seats - a.seats);

  const pieData = data.parties.map(party => ({
    name: party.name,
    value: party.seats,
    color: party.color,
  }));

  return (
    <div className="w-full bg-white text-[#2C2233] p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-2 text-purple-800">
        Podział Mandatów
      </h2>
      <p className="text-center text-sm mb-4 text-purple-600">
        {data.totalSeats} mandatów daje większość
      </p>
      
      {/* Pie chart */}
      <div className="w-full h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              dataKey="value"
              stroke="none"
              label={({ name, value }) => `${name} ${value}`}
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mb-6">
        {data.parties.map((party, index) => (
          <div key={index} className="flex items-center gap-1">
            <div 
              className="w-4 h-4 rounded-sm" 
              style={{ backgroundColor: party.color }}
            ></div>
            <span className="text-xs">{party.name}</span>
          </div>
        ))}
      </div>
      
      {/* Coalition vs Opposition */}
      <div className="flex border-t border-gray-200 pt-3">
        <div className="w-1/2 pr-2">
          <h3 className="text-center text-lg text-purple-700 mb-2">Koalicja Rządząca</h3>
          <p className="text-center font-semibold">{data.rulingCoalitionTotal}</p>
          <div className="mt-3">
            {sortedRulingParties.map((party, index) => (
              <div key={index} className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: party.color }}
                  ></div>
                  <span>{party.name}</span>
                </div>
                <span>{party.seats}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-px bg-gray-300 mx-2"></div>
        
        <div className="w-1/2 pl-2">
          <h3 className="text-center text-lg text-purple-700 mb-2">Opozycja</h3>
          <p className="text-center font-semibold">{data.oppositionTotal}</p>
          <div className="mt-3">
            {sortedOppositionParties.map((party, index) => (
              <div key={index} className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
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
