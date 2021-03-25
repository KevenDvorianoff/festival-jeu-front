import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import {ListFestivalComponent} from './list-festival/list-festival.component';
const routes: Routes = [
  { path: 'list-festival-component', component: ListFestivalComponent}
  { path: 'jeux', component: GameListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
 