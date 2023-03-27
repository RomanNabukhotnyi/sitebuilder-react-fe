export interface ApiKey {
  id: number;
  key: string;
  userId?: number;
  projectId?: number;
  createdAt: Date;
  updatedAt?: Date;
}
