import {ChangeDetectionStrategy, Component} from '@angular/core';
import {IDatePickerConfig} from "../../../ng2-date-picker/src/lib/date-picker/date-picker-config.model";
import {BehaviorSubject, Subject} from "rxjs";
import {ECalendarValue} from "../../../ng2-date-picker/src/lib/common/types/calendar-value-enum";

@Component({
  selector: 'dp-test1',
  template: `
    <div *ngIf="ui$ | async as ui" style="display: flex;flex-direction: column;gap: 1em">
        <dp-date-picker
          [config]="datePickerConfig"
          (onChange)="datepickerOutput$.next($event)"
          [ngClass]="{'customStyle' : ui.isStyled, 'darkMode' : ui.theme === 'dark'}">
        </dp-date-picker>
        <output *ngIf="datepickerOutput$ | async as output">
          {{output | json}}
        </output>
      <aside>
        <label>
          <input #styledInput
                 (change)="handleStyled(styledInput.checked)"
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
      </aside>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Test1Component {
  datePickerConfig: IDatePickerConfig = {
    format: 'DD.MM.YYYY',
    firstDayOfWeek: 'mo',
    returnedValueType: ECalendarValue.Dayjs,
  }
  datepickerOutput$ = new Subject<any>();
  ui$ = new BehaviorSubject<UI>(defaultUi)

  handleStyled(isStyled: boolean): void {
    const { value } = this.ui$;
    this.ui$.next({...value, isStyled})
  }

  handleTheme(mode: string) {
    const { value } = this.ui$;
    const theme = mode === 'dark' ? 'dark' : 'light';
    this.ui$.next({...value, theme})
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
