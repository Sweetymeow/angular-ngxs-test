import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { CardItem } from './data/interface';
// import { withLatestFrom } from 'rxjs/operators';
// import { AppStateModel } from './data/interface';
import { InitAction, RandomAction, NextQuestion, SwitchQAAction, RestartAction } from './state/app.actions';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { AppState } from './state/app.state';
import { DefaultData, LastItem } from './data/data';
// import { Store as ngxsStore } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'flashcard-app';

  data$: Observable<CardItem[]>;
  @Select(AppState.items) items$: Observable<CardItem[]>;
  @Select(AppState.curQusIdx) curQusIdx$: Observable<number>;
  @Select(AppState.showQuestion) showQuestion$: Observable<boolean>;
  // @Select(AppState) state$: Observable<AppStateModel>;
  cards : CardItem[];
  curIdx : number;
  isShowQuestion: boolean;

  constructor(private store: Store){
    this.data$ = this.store.select(state => state.data);
    this.items$.subscribe(items => {
      this.cards = items;
      console.log("update cards", this.cards);
    });
    this.curQusIdx$.subscribe(idx => {
      this.curIdx = idx;
    });
    this.showQuestion$.subscribe(val => {
      this.isShowQuestion = val;
    });
  }

  ngOnInit() {
    this.store.dispatch(new InitAction(DefaultData, LastItem))
    .pipe(
      withLatestFrom(this.items$)
    )
    .subscribe(([_, items]) => {
      this.cards = items;
    });
  }

  randomCards() {
    this.store.dispatch(new RandomAction(LastItem));
  }

  nextQuestion(){
    this.store.dispatch(new NextQuestion());
  }

  showAnswer(){
    this.store.dispatch(new SwitchQAAction());
  }

  restartApp(){
    this.store.dispatch(new RestartAction());
  }
}
