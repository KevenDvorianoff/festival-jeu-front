import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ListFestivalComponent, FestivalsComponentDialog } from './list-festival/list-festival.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { GameListComponent } from './game-list/game-list.component';
import { MatCardModule } from '@angular/material/card';
import { EditeursComponent, EditeursAddComponentDialog, EditeurGamesComponentDialog } from './editeurs/editeurs.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { OrganisatorListComponent, OrganisatorsComponentDialog } from './organisator-list/organisator-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ZonesComponent } from './zones/zones.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CurrentGameComponent } from './current-game/current-game.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameListComponent,
    ListFestivalComponent,
    EditeursComponent,
    EditeursAddComponentDialog,
    EditeurGamesComponentDialog,
    FestivalsComponentDialog,
    OrganisatorListComponent,
    OrganisatorsComponentDialog,
    ZonesComponent,
    ReservationComponent,
    CurrentGameComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTableModule,
    MatSnackBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

const menuIcon = document.querySelector('.anim');
