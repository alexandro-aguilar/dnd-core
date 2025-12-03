import Quest from '../entities/Quest';

export default interface QuestRepository {
  getById(id: string): Promise<Quest | null>;
  create(quest: Quest): Promise<Quest>;
}
