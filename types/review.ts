export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: number;
  productName: string;
  productSlug: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  date: string;
  createdAt: string;
}

export interface ReviewStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

