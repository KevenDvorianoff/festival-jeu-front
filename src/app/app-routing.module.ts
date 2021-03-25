import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Test2Component } from './test2/test2.component';
import {ListFestivalComponent} from './list-festival/list-festival.component';
const routes: Routes = [
  { path: 'test2-component', component: Test2Component },
  { path: 'list-festival-component', component: ListFestivalComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
 