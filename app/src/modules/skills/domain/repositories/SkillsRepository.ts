import Skill from '../entities/Skill';

export default interface SkillsRepository {
  listAll(): Promise<Array<Skill>>;
}
