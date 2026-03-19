
import React, { useMemo } from "react";
import { SeatDistribution } from "./types";

interface SeatDistributionGraphProps {
  data: SeatDistribution;
}

function generateHemicycleSeats(totalSeats: number, rows: number) {
  const seats: { x: number; y: number; row: number; index: number }[] = [];
  
  const innerRadius = 0.3;
  const outerRadius = 0.95;
  const rowSpacing = (outerRadius - innerRadius) / rows;
  
  // Distribute seats across rows proportionally to arc length
  const rowRadii = Array.from({ length: rows }, (_, i) => innerRadius + rowSpacing * (i + 0.5));
  const totalArc = rowRadii.reduce((sum, r) => sum + r, 0);
  const seatsPerRow = rowRadii.map((r) => Math.round((r / totalArc) * totalSeats));
  
  // Adjust to match exact total
  let diff = totalSeats - seatsPerRow.reduce((a, b) => a + b, 0);
  for (let i = seatsPerRow.length - 1; diff !== 0 && i >= 0; i--) {
    const adj = diff > 0 ? 1 : -1;
    seatsPerRow[i] += adj;
    diff -= adj;
  }
  
  let seatIndex = 0;
  for (let row = 0; row < rows; row++) {
    const radius = rowRadii[row];
    const count = seatsPerRow[row];
    const padding = 0.04; // angular padding from edges
    for (let s = 0; s < count; s++) {
      const angle = Math.PI - padding - ((Math.PI - 2 * padding) * s) / (count - 1 || 1);
      const x = 0.5 + radius * Math.cos(angle) * 0.5;
      const y = 1.0 - radius * Math.sin(angle) * 0.95;
      seats.push({ x, y, row, index: seatIndex++ });
    }
  }
  
  return seats;
}

export const SeatDistributionGraph: React.FC<SeatDistributionGraphProps> = ({ data }) => {
  const rulingCoalitionParties = data.parties.filter(party => party.coalition === "ruling");
  const oppositionParties = data.parties.filter(party => party.coalition === "opposition");
  
  const sortedRulingParties = [...rulingCoalitionParties].sort((a, b) => b.seats - a.seats);
  const sortedOppositionParties = [...oppositionParties].sort((a, b) => b.seats - a.seats);

  const seats = useMemo(() => generateHemicycleSeats(data.totalSeats, 15), [data.totalSeats]);

  // Build color array: assign seats to parties in order
  const seatColors = useMemo(() => {
    const colors: string[] = [];
    // Sort parties: ruling first (left side), then opposition (right side)
    const orderedParties = [...sortedRulingParties, ...sortedOppositionParties];
    for (const party of orderedParties) {
      for (let i = 0; i < party.seats; i++) {
        colors.push(party.color);
      }
    }
    return colors;
  }, [data.parties]);

  const dotRadius = 3.2;
  const viewBoxWidth = 500;
  const viewBoxHeight = 260;

  return (
    <div className="w-full bg-white text-[#2C2233] p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-2 text-purple-800">
        Podział Mandatów
      </h2>
      <p className="text-center text-sm mb-4 text-purple-600">
        {data.totalSeats} mandatów daje większość
      </p>
      
      {/* Hemicycle */}
      <div className="w-full flex justify-center mb-4">
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full max-w-[600px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {seats.map((seat, i) => (
            <circle
              key={i}
              cx={seat.x * viewBoxWidth}
              cy={seat.y * viewBoxHeight}
              r={dotRadius}
              fill={seatColors[i] || "#D1D5DB"}
            />
          ))}
        </svg>
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
