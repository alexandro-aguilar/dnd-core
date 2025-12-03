import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  PostQuestController: Symbol.for('PostQuestController'),
  CreateQuestCommandHandler: Symbol.for('CreateQuestCommandHandler'),
  QuestRepository: Symbol.for('QuestRepository'),
};
