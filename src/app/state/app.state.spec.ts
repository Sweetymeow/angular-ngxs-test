import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { AppState } from './app.state';
import { AppStateModel } from '../data/interface';
import { InitAction, NextQuestion, SwitchQAAction, RestartAction } from './app.actions';
import { DefaultData, LastItem } from '../data/data';

describe('App store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AppState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const testArr = [...DefaultData].slice(0, 1);
    const expected: AppStateModel = {
      data: testArr,
      items: testArr.concat(LastItem),
      curQusIdx: 0,
      showQuestion: true,
    };
    store.dispatch(new InitAction(testArr, LastItem));
    const actual = store.selectSnapshot(AppState.getState);
    expect(actual).toEqual(expected);
  });

  it('should get random questions each time restart app', () => {
    const testArr = DefaultData;
    const expectedIdxArr = testArr.concat(LastItem).map(item => item.index);
    store.dispatch(new InitAction(testArr, LastItem));
    const actual = store.selectSnapshot(AppState.items);
    const actualIdxArr = actual.map(item => item.index);
    expect(actualIdxArr).not.toEqual(expectedIdxArr);
    expect(actualIdxArr.sort()).toEqual(expectedIdxArr.sort());
  });

  it('should be able to interact with the card to show the answer', () => {
    const originState : boolean = store.selectSnapshot(AppState.showQuestion);
    store.dispatch(new SwitchQAAction());
    const actualState : boolean = store.selectSnapshot(AppState.showQuestion);
    expect(originState).toEqual(!actualState);
  });

  it('should able to interact with the card to show the next question.', () => {
    const currentQuestionIdx : number = store.selectSnapshot(AppState.curQusIdx);
    store.dispatch(new NextQuestion());
    const actualQuestionIdx: number = store.selectSnapshot(AppState.curQusIdx);
    expect(actualQuestionIdx - currentQuestionIdx).toEqual(1);
  });

});
