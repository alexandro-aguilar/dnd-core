import { commonTypes } from '@src/core/config/commonTypes';

export const types = {
  ...commonTypes,
  // region GetCharacters
  CharactersRepository: Symbol.for('CharactersRepository'),
  GetCharactersController: Symbol.for('GetCharactersController'),
  // endregion
  // region GetCharacterById
  GetCharacterByIdController: Symbol.for('GetCharacterByIdController'),
  GetCharacterByIdQueryHandler: Symbol.for('GetCharacterByIdQueryHandler'),
  // endregion
  // region PostCharacter
  PostCharacterController: Symbol.for('PostCharacterController'),
  CreateCharacterCommandHandler: Symbol.for('CreateCharacterCommandHandler'),
  // endregion
};
