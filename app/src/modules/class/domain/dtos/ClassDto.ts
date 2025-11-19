export default interface ClassDto {
  id: string;
  name: string;
  hitDie: string;
  primaryAbility: string;
  spellcastingAbility?: string | null;
}
