export type ProjectStatus = "ACTIVE" | "ARCHIVED" | "DELETED";

export interface Project {
  id: string;
  titulo: string;
  descripcion?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProjectStatus;
  collaborators?: StudioUser[];
  capas?: Capa[];
}

export interface Capa {
  id: string;
  nombre: string;
  projectId: string;
  orden: number;
  createdAt: Date;
  updatedAt: Date;
  beats?: Beat[];
}

export interface Beat {
  id: string;
  titulo: string;
  contenido: string;
  capaId: string;
  orden: number;
  createdAt: Date;
  updatedAt: Date;
  lockedBy?: string;
  comments?: string[];
}

export interface StudioUser {
  id: string;
  nombre: string;
  email: string;
  role: string;
}