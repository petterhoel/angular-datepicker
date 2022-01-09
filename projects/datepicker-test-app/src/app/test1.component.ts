import {Component, ChangeDetectionStrategy} from '@angular/core';
import {IDatePickerConfig} from "../../../ng2-date-picker/src/lib/date-picker/date-picker-config.model";
import {BehaviorSubject, Subject} from "rxjs";

@Component({
  selector: 'dp-test1',
  template: `
    <div *ngIf="ui$ | async as ui">
      <h1>test1</h1>
      <section>
        <dp-date-picker
          [config]="format"
          (onChange)="output$.next($event)"
          [ngClass]="{'customStyle' : ui.isStyled, 'darkMode' : ui.theme === 'dark'}">
        </dp-date-picker>
        <output *ngIf="output$ | async as output">
          {{ output | json }}
        </output>
        <hr>
        <label>
          <input #styledInput
                 (change)="handleStyled(styledInput?.checked)"
                 id="styled"
                 type="checkbox">
          styled</label>
        <label>
          <input type="radio"
                 (change)="handleTheme(light.value)"
                 #light
                 name="theme"
                 value="light"
                 [disabled]="!styledInput.checked">
          {{light.value}}
        </label>
        <label>
          <input type="radio"
                 (change)="handleTheme(dark.value)"
                 #dark
                 name="theme"
                 value="dark"
                 [disabled]="!styledInput.checked">
          {{dark.value}}</label>
        <hr>
        <output>
          {{ ui | json}}
        </output>
      </section>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Test1Component {
  format: IDatePickerConfig = {
    format: 'DD.MM.YYYY'
  }
  output$ = new Subject<any>();
  ui$ = new BehaviorSubject<UI>(defaultUi)

  handleStyled(isStyled: boolean): void {
    const currentUi = this.ui$.value;
    this.ui$.next({...currentUi, isStyled})
  }

  handleTheme(mode: string) {
    const currentUi = this.ui$.value;
    const theme = mode === 'dark' ? 'dark' : 'light';
    this.ui$.next({...currentUi, theme})
  }
}

export const defaultUi: UI = {
  isStyled: false,
  theme: 'light'
}

interface UI {
  isStyled: boolean,
  theme: 'light' | 'dark'
}
