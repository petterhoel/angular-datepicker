import { Component } from '@angular/core';
import dayjs, {Dayjs} from 'dayjs';
import no from 'dayjs/locale/no'

@Component({
  selector: 'test-root',
  template: `
    <h1>Datepicker test app</h1>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {


  constructor() {
    dayjs.locale('no')
  }

}
