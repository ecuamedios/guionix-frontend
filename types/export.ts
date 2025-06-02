export type ExportFormat = "pdf" | "fountain" | "finaldraft";

export interface ExportRequest {
  projectId: string;
  format: ExportFormat;
  userId: string;
  options?: Record<string, any>;
}

export interface ExportResult {
  url: string;
  size: number;
  createdAt: Date;
  format: ExportFormat;
  status: "SUCCESS" | "FAILED" | "PENDING";
  error?: string;
}

export interface ExportHistoryItem {
  id: string;
  projectId: string;
  userId: string;
  format: ExportFormat;
  createdAt: Date;
  status: "SUCCESS" | "FAILED" | "PENDING";
  url?: string;
}