import { CardItem } from '../data/interface';

export class InitAction {
  public static readonly type = '[App] Add item';
  constructor(public payload: Array<CardItem>, public item: CardItem) { }
}
export class RandomAction {
  public static readonly type = '[App] Random List';
  constructor(public lastItem: CardItem) { }
}
export class NextQuestion {
  public static readonly type = '[App] Next item';
  // constructor(public index: number) { }
}
export class SwitchQAAction {
  public static readonly type = '[App] Show Question';
  // constructor(public payload: string) { }
}
export class RestartAction {
  public static readonly type = '[App] Re-Start';
  // constructor(public payload: string) { }
}
