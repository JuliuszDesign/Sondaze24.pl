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

export type ViewType = "presidential" | "party";
