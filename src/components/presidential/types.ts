
export interface Candidate {
  name: string;
  percentage: number;
  imageUrl: string;
}

export interface PollData {
  title: string;
  date?: string;
  source?: string;
  candidates: Candidate[];
}

export interface PartySeats {
  name: string;
  seats: number;
  color: string;
  coalition: "ruling" | "opposition";
}

export interface SeatDistribution {
  totalSeats: number;
  rulingCoalitionTotal: number;
  oppositionTotal: number;
  parties: PartySeats[];
}

export type ViewType = "presidential" | "party";
