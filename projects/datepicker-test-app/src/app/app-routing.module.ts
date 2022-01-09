import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Test1Component} from "./test1.component";

const routes: Routes = [
  {
    path: 'test-1',
    component: Test1Component
  },
  {
    path: '',
    redirectTo: '/test-1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
