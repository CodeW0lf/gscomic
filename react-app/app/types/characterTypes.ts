export interface TalkingHead {
  portraitImg: string;
  text: string;
}

export interface Character {
  name: string;
  fullImg: string;
  talkingHeads: TalkingHead[];
}

export interface CharacterList {
  characters: Character[];
}
