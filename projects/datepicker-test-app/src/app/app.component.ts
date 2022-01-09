import { Component } from '@angular/core';
import dayjs, {Dayjs} from 'dayjs';
import nb from 'dayjs/locale/nb'

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
    dayjs.locale(nb)
  }

}
