import { Character } from 'hoshimi-types/ProtoMaster';
type ICharacter = Omit<Character, 'heightCorrectionPermil' | 'costumeAdditionMotionAssetIds' | 'talkArrivalAdditionMotionAssetId' | 'viewConditionId'>;

export type { ICharacter };
