import Session from '../entities/Session';

export default interface SessionRepository {
  getById(id: string): Promise<Session | null>;
  create(session: any): Promise<any>;
}
