export type CollaborationResourceType = "BEAT" | "CAPA" | "PROJECT";

export interface CollaborationLock {
  id: string;
  resourceId: string;
  userId: string;
  type: CollaborationResourceType;
  acquiredAt: Date;
  expiresAt: Date;
}

export interface CollaborationComment {
  id: string;
  resourceId: string;
  userId: string;
  content: string;
  createdAt: Date;
  resolved: boolean;
  replies?: CollaborationComment[];
}

export interface CollaborationEvent {
  id: string;
  type: "LOCK" | "UNLOCK" | "COMMENT" | "EDIT";
  userId: string;
  resourceId: string;
  timestamp: Date;
  details?: Record<string, any>;
}