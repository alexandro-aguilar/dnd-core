export type QuestStatus = 'not_started' | 'active' | 'resolved' | 'failed';

export default interface QuestDto {
  id: string;
  sessionId: string;
  name: string;
  summary?: string | null;
  status: QuestStatus;
  hook?: string | null;
  reward?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
