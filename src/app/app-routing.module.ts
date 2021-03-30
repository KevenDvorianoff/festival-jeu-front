import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { ListFestivalComponent } from './list-festival/list-festival.component';
import { EditeursComponent } from './editeurs/editeurs.component';
import { ZonesComponent } from './zones/zones.component';
import { OrganisatorListComponent } from './organisator-list/organisator-list.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CurrentGameComponent } from './current-game/current-game.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { ConnectedGuard } from './guards/connected.guard';

const routes: Routes = [
  { path: '', redirectTo: 'festival-jeux', pathMatch: 'full' },
  { path: 'connexion', component: AuthFormComponent },

  { path: 'festivals', component: ListFestivalComponent, canActivate: [ConnectedGuard] },
  { path: 'jeux', component: GameListComponent, canActivate: [ConnectedGuard] },
  { path: 'editeurs', component: EditeursComponent, canActivate: [ConnectedGuard] },
  { path: 'organisateurs', component: OrganisatorListComponent, canActivate: [ConnectedGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [ConnectedGuard] },

  { path: 'festival-jeux', component: CurrentGameComponent },
  { path: 'festival-reservations', component: ReservationComponent, canActivate: [ConnectedGuard] },
  { path: 'festival-zones', component: ZonesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
