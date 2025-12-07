export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface PlaceDetails {
  name: string;
  address: string;
  googleRating: number;
}

export interface ReviewAnalysis {
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  summary: string;
  recommendation: string;
  complaintTags: string[]; // e.g., "Undercooked", "Dirty Tables"
  recentTrend: string; // e.g., "Complaints increased by 15% in 30 days"
  hygieneComplaintsCount: number;
  totalCommentsAnalyzed: number;
}

export interface CrowdData {
  visitsLast30Days: number;
  stomachComplaints: number;
  hospitalVisits: number;
  symptomBreakdown: { name: string; value: number }[];
}

export interface FullReport {
  place: PlaceDetails;
  analysis: ReviewAnalysis;
  crowd: CrowdData;
  timestamp: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}