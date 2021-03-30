import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { ListFestivalComponent } from './list-festival/list-festival.component';
import { EditeursComponent } from './editeurs/editeurs.component';
import { ZonesComponent} from './zones/zones.component';
import { OrganisatorListComponent } from './organisator-list/organisator-list.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CurrentGameComponent } from './current-game/current-game.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AuthFormComponent } from './auth-form/auth-form.component';

const routes: Routes = [
  { path: 'festival', component: ListFestivalComponent },
  { path: 'jeux', component: GameListComponent },
  { path: 'editeurs', component: EditeursComponent },
  { path: 'organisateurs', component: OrganisatorListComponent },
  { path: 'zones', component: ZonesComponent},
  { path: 'reservation', component: ReservationComponent},
  { path: 'currentGame', component: CurrentGameComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'connexion', component: AuthFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
