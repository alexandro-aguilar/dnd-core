import { randomUUID } from 'node:crypto';
import { db, pool } from '@src/core/infrastructure/database/postgres-drizzle.config';
import {
  abilities,
  backgrounds,
  characterAbilityScores,
  characterClasses,
  characterItems,
  characterSkills,
  characterSpells,
  characters,
  classes,
  items,
  races,
  skills,
  spells,
  subraces,
  users,
} from '@src/core/infrastructure/database/schema';

const userIds = {
  aelar: randomUUID(),
  borin: randomUUID(),
} as const;

const raceIds = {
  human: randomUUID(),
  elf: randomUUID(),
  dwarf: randomUUID(),
} as const;

const subraceIds = {
  highElf: randomUUID(),
  woodElf: randomUUID(),
  mountainDwarf: randomUUID(),
} as const;

const backgroundIds = {
  sage: randomUUID(),
  soldier: randomUUID(),
} as const;

const classIds = {
  fighter: randomUUID(),
  wizard: randomUUID(),
  cleric: randomUUID(),
  rogue: randomUUID(),
} as const;

const abilityIds = {
  str: randomUUID(),
  dex: randomUUID(),
  con: randomUUID(),
  int: randomUUID(),
  wis: randomUUID(),
  cha: randomUUID(),
} as const;

const skillIds = {
  acrobatics: randomUUID(),
  animalHandling: randomUUID(),
  arcana: randomUUID(),
  athletics: randomUUID(),
  deception: randomUUID(),
  history: randomUUID(),
  insight: randomUUID(),
  intimidation: randomUUID(),
  investigation: randomUUID(),
  medicine: randomUUID(),
  nature: randomUUID(),
  perception: randomUUID(),
  performance: randomUUID(),
  persuasion: randomUUID(),
  religion: randomUUID(),
  sleightOfHand: randomUUID(),
  stealth: randomUUID(),
  survival: randomUUID(),
} as const;

const itemIds = {
  longsword: randomUUID(),
  shield: randomUUID(),
  explorersPack: randomUUID(),
  spellbook: randomUUID(),
  warhammer: randomUUID(),
  holySymbol: randomUUID(),
} as const;

const spellIds = {
  fireBolt: randomUUID(),
  magicMissile: randomUUID(),
  cureWounds: randomUUID(),
  shieldOfFaith: randomUUID(),
} as const;

const characterIds = {
  aelar: randomUUID(),
  borin: randomUUID(),
} as const;

const createAbilityScores = (characterId: string, scoreMap: Record<keyof typeof abilityIds, number>) =>
  Object.entries(scoreMap).map(([abilityKey, score]) => ({
    id: randomUUID(),
    characterId,
    abilityId: abilityIds[abilityKey as keyof typeof abilityIds],
    score,
  }));

const createCharacterSkills = (
  characterId: string,
  proficientSkills: Array<{ skillKey: keyof typeof skillIds; expertise?: boolean }>
) =>
  proficientSkills.map(({ skillKey, expertise }) => ({
    id: randomUUID(),
    characterId,
    skillId: skillIds[skillKey],
    isProficient: true,
    hasExpertise: Boolean(expertise),
  }));

async function seed() {
  const userData = [
    {
      id: userIds.aelar,
      email: 'aelar@silverquill.academy',
      name: 'Aelar Stormwind',
      passwordHash: '$2b$10$R3nNr2mXx1K3YQwP0X5E.eMhF8X6yE7YtVjO7iCkLwVw9h6VxG5OG',
    },
    {
      id: userIds.borin,
      email: 'borin@citadel.watch',
      name: 'Borin Ironfist',
      passwordHash: '$2b$10$UWx/FxTOfakeHashValueToSimulateBcryptString000',
    },
  ];

  const raceData = [
    { id: raceIds.human, name: 'Human', baseSpeed: 30, size: 'Medium' },
    { id: raceIds.elf, name: 'Elf', baseSpeed: 30, size: 'Medium' },
    { id: raceIds.dwarf, name: 'Dwarf', baseSpeed: 25, size: 'Medium' },
  ];

  const subraceData = [
    { id: subraceIds.highElf, raceId: raceIds.elf, name: 'High Elf' },
    { id: subraceIds.woodElf, raceId: raceIds.elf, name: 'Wood Elf' },
    { id: subraceIds.mountainDwarf, raceId: raceIds.dwarf, name: 'Mountain Dwarf' },
  ];

  const backgroundData = [
    { id: backgroundIds.sage, name: 'Sage', feature: 'Researcher' },
    { id: backgroundIds.soldier, name: 'Soldier', feature: 'Military Rank' },
  ];

  const classData = [
    {
      id: classIds.fighter,
      name: 'Fighter',
      hitDie: 'd10',
      primaryAbility: 'STR',
      spellcastingAbility: null,
    },
    {
      id: classIds.wizard,
      name: 'Wizard',
      hitDie: 'd6',
      primaryAbility: 'INT',
      spellcastingAbility: 'INT',
    },
    {
      id: classIds.cleric,
      name: 'Cleric',
      hitDie: 'd8',
      primaryAbility: 'WIS',
      spellcastingAbility: 'WIS',
    },
    {
      id: classIds.rogue,
      name: 'Rogue',
      hitDie: 'd8',
      primaryAbility: 'DEX',
      spellcastingAbility: null,
    },
  ];

  const abilityData = [
    { id: abilityIds.str, code: 'STR', name: 'Strength' },
    { id: abilityIds.dex, code: 'DEX', name: 'Dexterity' },
    { id: abilityIds.con, code: 'CON', name: 'Constitution' },
    { id: abilityIds.int, code: 'INT', name: 'Intelligence' },
    { id: abilityIds.wis, code: 'WIS', name: 'Wisdom' },
    { id: abilityIds.cha, code: 'CHA', name: 'Charisma' },
  ];

  const skillData = [
    { id: skillIds.acrobatics, name: 'Acrobatics', abilityId: abilityIds.dex },
    { id: skillIds.animalHandling, name: 'Animal Handling', abilityId: abilityIds.wis },
    { id: skillIds.arcana, name: 'Arcana', abilityId: abilityIds.int },
    { id: skillIds.athletics, name: 'Athletics', abilityId: abilityIds.str },
    { id: skillIds.deception, name: 'Deception', abilityId: abilityIds.cha },
    { id: skillIds.history, name: 'History', abilityId: abilityIds.int },
    { id: skillIds.insight, name: 'Insight', abilityId: abilityIds.wis },
    { id: skillIds.intimidation, name: 'Intimidation', abilityId: abilityIds.cha },
    { id: skillIds.investigation, name: 'Investigation', abilityId: abilityIds.int },
    { id: skillIds.medicine, name: 'Medicine', abilityId: abilityIds.wis },
    { id: skillIds.nature, name: 'Nature', abilityId: abilityIds.int },
    { id: skillIds.perception, name: 'Perception', abilityId: abilityIds.wis },
    { id: skillIds.performance, name: 'Performance', abilityId: abilityIds.cha },
    { id: skillIds.persuasion, name: 'Persuasion', abilityId: abilityIds.cha },
    { id: skillIds.religion, name: 'Religion', abilityId: abilityIds.int },
    { id: skillIds.sleightOfHand, name: 'Sleight of Hand', abilityId: abilityIds.dex },
    { id: skillIds.stealth, name: 'Stealth', abilityId: abilityIds.dex },
    { id: skillIds.survival, name: 'Survival', abilityId: abilityIds.wis },
  ];

  const itemData = [
    { id: itemIds.longsword, name: 'Longsword', type: 'Weapon', weight: '3', cost: '15' },
    { id: itemIds.shield, name: 'Shield', type: 'Armor', weight: '6', cost: '10' },
    // eslint-disable-next-line quotes
    { id: itemIds.explorersPack, name: "Explorer's Pack", type: 'Adventuring Gear', weight: '59.5', cost: '10' },
    { id: itemIds.spellbook, name: 'Spellbook', type: 'Adventuring Gear', weight: '3', cost: '50' },
    { id: itemIds.warhammer, name: 'Warhammer', type: 'Weapon', weight: '2', cost: '15' },
    { id: itemIds.holySymbol, name: 'Holy Symbol (Amulet)', type: 'Adventuring Gear', weight: '1', cost: '5' },
  ];

  const spellData = [
    {
      id: spellIds.fireBolt,
      name: 'Fire Bolt',
      level: 0,
      school: 'Evocation',
      castingTime: '1 action',
      range: '120 feet',
      components: 'V, S',
      duration: 'Instantaneous',
      concentration: false,
      description: 'You hurl a mote of fire at a creature or object within range.',
    },
    {
      id: spellIds.magicMissile,
      name: 'Magic Missile',
      level: 1,
      school: 'Evocation',
      castingTime: '1 action',
      range: '120 feet',
      components: 'V, S',
      duration: 'Instantaneous',
      concentration: false,
      description: 'Create three glowing darts of magical force that strike creatures you can see.',
    },
    {
      id: spellIds.cureWounds,
      name: 'Cure Wounds',
      level: 1,
      school: 'Evocation',
      castingTime: '1 action',
      range: 'Touch',
      components: 'V, S',
      duration: 'Instantaneous',
      concentration: false,
      description: 'A creature you touch regains a number of hit points equal to 1d8 + spellcasting modifier.',
    },
    {
      id: spellIds.shieldOfFaith,
      name: 'Shield of Faith',
      level: 1,
      school: 'Abjuration',
      castingTime: '1 bonus action',
      range: '60 feet',
      components: 'V, S, M (a small parchment with a bit of holy text)',
      duration: 'Up to 10 minutes',
      concentration: true,
      description: 'A shimmering field surrounds a creature granting it +2 AC for the duration.',
    },
  ];

  const characterData = [
    {
      id: characterIds.aelar,
      userId: userIds.aelar,
      name: 'Aelar Stormwind',
      level: 5,
      raceId: raceIds.elf,
      subraceId: subraceIds.highElf,
      backgroundId: backgroundIds.sage,
      alignment: 'Chaotic Good',
      experiencePoints: 6500,
      maxHitPoints: 32,
      currentHitPoints: 28,
      temporaryHitPoints: 0,
      armorClass: 16,
      speed: 35,
      inspiration: true,
      personalityTraits: 'Sees patterns in ancient lore and cannot resist deciphering. Soft-spoken but intense.',
      ideals: 'Knowledge must be used to protect the vulnerable.',
      bonds: 'Sworn to recover the lost grimoires of Everdawn.',
      flaws: 'Will chase arcane mysteries even when danger is obvious.',
    },
    {
      id: characterIds.borin,
      userId: userIds.borin,
      name: 'Borin Ironfist',
      level: 5,
      raceId: raceIds.dwarf,
      subraceId: subraceIds.mountainDwarf,
      backgroundId: backgroundIds.soldier,
      alignment: 'Lawful Good',
      experiencePoints: 6700,
      maxHitPoints: 47,
      currentHitPoints: 47,
      temporaryHitPoints: 5,
      armorClass: 18,
      speed: 25,
      inspiration: false,
      personalityTraits: 'Keeps gear immaculate and trusts battle-proven tactics.',
      ideals: 'Discipline brings victory and keeps comrades alive.',
      bonds: 'Owes his life to the Hammershield regiment.',
      flaws: 'Struggles to abandon a fight once it has begun.',
    },
  ];

  const characterClassData = [
    {
      id: randomUUID(),
      characterId: characterIds.aelar,
      classId: classIds.wizard,
      classLevel: 5,
    },
    {
      id: randomUUID(),
      characterId: characterIds.borin,
      classId: classIds.cleric,
      classLevel: 4,
    },
    {
      id: randomUUID(),
      characterId: characterIds.borin,
      classId: classIds.fighter,
      classLevel: 1,
    },
  ];

  const characterAbilityScoreData = [
    ...createAbilityScores(characterIds.aelar, {
      str: 10,
      dex: 16,
      con: 14,
      int: 18,
      wis: 12,
      cha: 11,
    }),
    ...createAbilityScores(characterIds.borin, {
      str: 16,
      dex: 10,
      con: 16,
      int: 10,
      wis: 16,
      cha: 12,
    }),
  ];

  const characterSkillData = [
    ...createCharacterSkills(characterIds.aelar, [
      { skillKey: 'arcana', expertise: true },
      { skillKey: 'history' },
      { skillKey: 'investigation' },
      { skillKey: 'perception' },
    ]),
    ...createCharacterSkills(characterIds.borin, [
      { skillKey: 'athletics' },
      { skillKey: 'insight' },
      { skillKey: 'medicine' },
      { skillKey: 'religion' },
    ]),
  ];

  const characterItemData = [
    {
      id: randomUUID(),
      characterId: characterIds.aelar,
      itemId: itemIds.longsword,
      quantity: 1,
      isEquipped: false,
      equippedSlot: 'scabbard',
      customName: 'Moonpetal',
      notes: 'Elven heirloom enchanted to glow softly.',
    },
    {
      id: randomUUID(),
      characterId: characterIds.aelar,
      itemId: itemIds.spellbook,
      quantity: 1,
      isEquipped: true,
      equippedSlot: 'bandolier',
      customName: null,
      notes: 'Contains research on planar ley-lines.',
    },
    {
      id: randomUUID(),
      characterId: characterIds.aelar,
      itemId: itemIds.explorersPack,
      quantity: 1,
      isEquipped: true,
      equippedSlot: 'back',
      customName: null,
      notes: 'Standard wizarding travel gear.',
    },
    {
      id: randomUUID(),
      characterId: characterIds.borin,
      itemId: itemIds.warhammer,
      quantity: 1,
      isEquipped: true,
      equippedSlot: 'main_hand',
      customName: 'Stonebreaker',
      notes: 'Forged by his clan founders.',
    },
    {
      id: randomUUID(),
      characterId: characterIds.borin,
      itemId: itemIds.shield,
      quantity: 1,
      isEquipped: true,
      equippedSlot: 'off_hand',
      customName: null,
      notes: 'Etched with Moradin runes.',
    },
    {
      id: randomUUID(),
      characterId: characterIds.borin,
      itemId: itemIds.holySymbol,
      quantity: 1,
      isEquipped: true,
      equippedSlot: 'neck',
      customName: null,
      notes: 'Gleams with gentle radiance when channeling divinity.',
    },
  ];

  const characterSpellData = [
    {
      id: randomUUID(),
      characterId: characterIds.aelar,
      spellId: spellIds.fireBolt,
      known: true,
      prepared: true,
      sourceClassId: classIds.wizard,
    },
    {
      id: randomUUID(),
      characterId: characterIds.aelar,
      spellId: spellIds.magicMissile,
      known: true,
      prepared: true,
      sourceClassId: classIds.wizard,
    },
    {
      id: randomUUID(),
      characterId: characterIds.borin,
      spellId: spellIds.cureWounds,
      known: true,
      prepared: true,
      sourceClassId: classIds.cleric,
    },
    {
      id: randomUUID(),
      characterId: characterIds.borin,
      spellId: spellIds.shieldOfFaith,
      known: true,
      prepared: true,
      sourceClassId: classIds.cleric,
    },
  ];

  await db.transaction(async (tx) => {
    await tx.delete(characterSpells);
    await tx.delete(characterItems);
    await tx.delete(characterSkills);
    await tx.delete(characterAbilityScores);
    await tx.delete(characterClasses);
    await tx.delete(characters);
    await tx.delete(spells);
    await tx.delete(items);
    await tx.delete(skills);
    await tx.delete(abilities);
    await tx.delete(classes);
    await tx.delete(backgrounds);
    await tx.delete(subraces);
    await tx.delete(races);
    await tx.delete(users);

    await tx.insert(users).values(userData);
    await tx.insert(races).values(raceData);
    await tx.insert(subraces).values(subraceData);
    await tx.insert(backgrounds).values(backgroundData);
    await tx.insert(classes).values(classData);
    await tx.insert(abilities).values(abilityData);
    await tx.insert(skills).values(skillData);
    await tx.insert(items).values(itemData);
    await tx.insert(spells).values(spellData);
    await tx.insert(characters).values(characterData);
    await tx.insert(characterClasses).values(characterClassData);
    await tx.insert(characterAbilityScores).values(characterAbilityScoreData);
    await tx.insert(characterSkills).values(characterSkillData);
    await tx.insert(characterItems).values(characterItemData);
    await tx.insert(characterSpells).values(characterSpellData);
  });
}

seed()
  .then(() => {
    console.log('Database seeded with D&D 5e sample data.');
  })
  .catch((error) => {
    console.error('Failed to seed database', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
