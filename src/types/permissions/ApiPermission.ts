export interface ApiPermission {
  id: number;
  userId: number;
  email: string;
  permission: 'OWNER' | 'DESIGNER';
}
