import User from '@src/modules/users/domain/entities/User';

export type SessionStatus = 'planned' | 'in_progress' | 'complete';

export default interface SessionDto {
  id: string;
  dm: string | User;
  title: string;
  status: SessionStatus;
  notes?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
