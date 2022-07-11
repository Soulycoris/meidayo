import { ActivityAbility, Card, LiveAbility, Skill } from 'hoshimi-types/ProtoMaster';

type ICard = Omit<Card, 'imageType1' | 'displayPositionX1' | 'displayPositionY1' | 'displayScale1' | 'highlightDisplayPositionX1' | 'highlightDisplayPositionY1' | 'highlightDisplayScale1' | 'imageType2' | 'displayPositionX2' | 'displayPositionY2' | 'displayScale2' | 'highlightDisplayPositionX2' | 'highlightDisplayPositionY2' | 'highlightDisplayScale2'>;
type CardList = Pick<Card, 'id' | 'name' | 'type' | 'assetId' | 'releaseDate' | 'initialRarity' | 'characterId' | 'vocalRatioPermil' | 'danceRatioPermil' | 'visualRatioPermil'>;
type CardPropensity = 'vocal' | 'visual' | 'dance';
interface CardDetail {
  card: ICard;
  skill: Skill[];
  activityAbility?: ActivityAbility;
  liveAbility?: LiveAbility;
}
interface CardStoryDetail {
  title: string;
  message: {
    text: string;
    name: string;
  }[];
}

export { ICard, CardDetail, CardList, CardStoryDetail, CardPropensity };
