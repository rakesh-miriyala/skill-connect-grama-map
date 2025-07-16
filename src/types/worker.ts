export interface Worker {
  id: string;
  name: string;
  phone: string;
  village: string;
  skills: string[];
  experience: number;
  description?: string;
  registeredBy: 'self' | 'admin';
  adminName?: string;
  createdAt: Date;
  isActive: boolean;
}

export interface SearchFilters {
  skill: string;
  village: string;
}

export interface WorkerFormData {
  name: string;
  phone: string;
  village: string;
  skills: string[];
  experience: number;
  description?: string;
}