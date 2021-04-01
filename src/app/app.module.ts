import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ListFestivalComponent } from './list-festival/list-festival.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { GameListComponent } from './game-list/game-list.component';
import { MatCardModule } from '@angular/material/card';
import { EditeursComponent, EditeursAddComponentDialog, EditeurGamesComponentDialog, EditeursEditComponentDialog } from './editeurs/editeurs.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { OrganisatorListComponent } from './organisator-list/organisator-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ZonesComponent, ZoneGamesComponentDialog } from './zones/zones.component';
import { ReservationComponent, ReservationsInfosComponentDialog } from './reservation/reservation.component';
import { CurrentGameComponent } from './current-game/current-game.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { ContactsComponent, ContactAddComponentDialog, ContactEditComponentDialog, DeleteContactComponentDialog } from './contacts/contacts.component';
import { AddGameComponentDialog } from './game-list/add-game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DeleteGameComponentDialog } from './game-list/delete-game.component';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { UpdateGameComponentDialog } from './game-list/update-game.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { DeleteOrganisatorComponentDialog } from './organisator-list/delete-organisator.component';
import { UpdateOrganisatorComponentDialog } from './organisator-list/update-organisator.component';
import { AddOrganisatorComponentDialog} from './organisator-list/add-organisator.component';
import { CurrentEditeursComponent, CurrentEditeurGamesComponentDialog } from './current-editeurs/current-editeurs.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameListComponent,
    ListFestivalComponent,
    EditeursComponent,
    EditeursAddComponentDialog,
    EditeurGamesComponentDialog,
    OrganisatorListComponent,
    ZonesComponent,
    ReservationComponent,
    CurrentGameComponent,
    ContactsComponent,
    ReservationsInfosComponentDialog,
    AddGameComponentDialog,
    DeleteGameComponentDialog,
    YesNoPipe,
    UpdateGameComponentDialog,
    EditeursEditComponentDialog,
    ContactAddComponentDialog,
    AuthFormComponent,
    DeleteOrganisatorComponentDialog,
    UpdateOrganisatorComponentDialog,
    AddOrganisatorComponentDialog,
    EditeursEditComponentDialog,
    ContactAddComponentDialog,
    ContactEditComponentDialog,
    CurrentEditeursComponent,
    CurrentEditeurGamesComponentDialog,
    ZoneGamesComponentDialog,
    DeleteContactComponentDialog,
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
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

const menuIcon = document.querySelector('.anim');
