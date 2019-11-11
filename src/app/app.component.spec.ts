import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './state/app.state';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        NgxsModule.forRoot([
          AppState
        ]),
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const comp = fixture.componentInstance;
    console.log(comp);
    expect(app).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it(`should have as title 'flashcard-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('flashcard-app');
  });

  it('should render title in app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const htmlEle = compiled.getElementsByClassName('app-title');
    expect(htmlEle && htmlEle[0] ? htmlEle[0].textContent : "").toContain('flashcard-app');
  });

  it('should has a container HTML for questions and answer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const qHtml = compiled.getElementsByClassName('card-question');
    const aHtml = compiled.getElementsByClassName('card-answer hidden');
    expect(qHtml && qHtml[0] ? qHtml[0].textContent : "").not.toBe('');;
    expect(aHtml && aHtml[0] ? aHtml[0].textContent : "").not.toBe('');;
  });

});
