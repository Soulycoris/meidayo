export { CharacterActivityLevel, CharacterGroup } from 'hoshimi-types/ProtoMaster';
import { Character } from 'hoshimi-types/ProtoMaster';
type ICharacter = Omit<Character, 'heightCorrectionPermil' | 'costumeAdditionMotionAssetIds' | 'talkArrivalAdditionMotionAssetId' | 'viewConditionId'>;

export { ICharacter };
