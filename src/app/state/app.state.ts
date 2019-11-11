import { State, Action, Selector, StateContext } from '@ngxs/store';
import { InitAction, RandomAction, NextQuestion, SwitchQAAction, RestartAction } from './app.actions';
import { CardItem } from '../data/interface';
import { AppStateModel } from '../data/interface';

@State<AppStateModel>({
  name: 'app',
  defaults: {
    items: [],
    data: [],
    curQusIdx: 0,
    showQuestion: true,
  }
})

export class AppState {

  @Selector()
  public static getState(state: AppStateModel) {
    return state;
  }

  @Selector()
  public static items(state: AppStateModel) {
    return state.items;
  }

  @Selector()
  public static curQusIdx(state: AppStateModel) {
    return state.curQusIdx;
  }

  @Selector()
  public static showQuestion(state: AppStateModel) {
    return state.showQuestion;
  }

  @Action(InitAction)
  public add(ctx: StateContext<AppStateModel>, { payload, item } : InitAction) {
    const stateModel = ctx.getState();
    stateModel.data = payload;
    ctx.setState(stateModel);
    ctx.dispatch(new RandomAction(item));
  }

  randomIdx(leng : number) : number{
    if(leng <= 1) return leng;
    return Math.floor(Math.random() * leng);
  }

  @Action(RandomAction)
  public random(ctx: StateContext<AppStateModel>, { lastItem } : RandomAction) {
    const stateModel = ctx.getState();
    const dataIdxArray : number[] = stateModel.data.map((item : CardItem, idx : number) => idx);
    const randomData = [];

    // get random array for origin QA array
    for( let i = 0; i < stateModel.data.length; i++){
      const leng = dataIdxArray.length;
      const randomIdx : number = leng > 1 ? dataIdxArray.splice(this.randomIdx(leng), 1)[0] : dataIdxArray.pop();
      randomData.push(stateModel.data[randomIdx]);
    }
    console.log("randomData", randomData);
    stateModel.items = randomData.concat(lastItem);
    ctx.patchState(stateModel);
  }

  @Action(NextQuestion)
  public nextQuestion(ctx: StateContext<AppStateModel>) { // , { index } : NextQuestion
    const stateModel = ctx.getState();

    if(stateModel.curQusIdx === stateModel.items.length - 1){
      stateModel.curQusIdx = 0;
    }else{
      stateModel.curQusIdx++
    }

    stateModel.showQuestion = true;
    ctx.patchState(stateModel);
  }

  @Action(SwitchQAAction)
  public switchQA(ctx: StateContext<AppStateModel>) {
    const stateModel = ctx.getState();

    stateModel.showQuestion = !stateModel.showQuestion;
    ctx.patchState(stateModel);
  }

  @Action(RestartAction)
  public restart(ctx: StateContext<AppStateModel>) {
    const stateModel = ctx.getState();
    ctx.dispatch(RandomAction);
    stateModel.curQusIdx = 0;
    ctx.patchState(stateModel);
  }
}
