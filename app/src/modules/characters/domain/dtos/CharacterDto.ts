export default interface CharacterDto {
  id: string;
  userId: string;
  name: string;
  level: number;
  raceId: string;
  subraceId?: string | null;
  backgroundId: string;
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
