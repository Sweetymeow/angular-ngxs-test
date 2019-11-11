export interface CardItem {
  index: number;
  question: string;
  answer: string;
}

export interface AppStateModel {
  items: CardItem[];
  data: CardItem[];
  curQusIdx: number;
  showQuestion: boolean;
}
