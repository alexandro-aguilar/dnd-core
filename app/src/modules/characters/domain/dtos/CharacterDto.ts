import Background from '@src/modules/backgrounds/domain/entities/Background';
import Race from '@src/modules/races/domain/entities/Race';
import Subrace from '@src/modules/subraces/domain/entities/Subrace';
import User from '@src/modules/users/domain/entities/User';

export default interface CharacterDto {
  id: string;
  user: string | User;
  name: string;
  level: number;
  race: string | Race;
  subrace: string | Subrace;
  background: string | Background;
  alignment: string;
  experiencePoints: number;
  maxHitPoints: number;
  currentHitPoints: number;
  temporaryHitPoints: number;
  armorClass: number;
  speed: number;
  inspiration: boolean;
  personalityTraits?: string | null;
  ideals?: string | null;
  bonds?: string | null;
  flaws?: string | null;
}
