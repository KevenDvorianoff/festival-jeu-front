import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Contact } from './contact';
import { MatTableDataSource } from '@angular/material/table';
import { ContactService } from './contacts.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  providers: [ContactService],
  styleUrls: ['./contacts.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ContactsComponent implements OnInit {

  contacts = new MatTableDataSource<Contact>([]);

  columnsToDisplay  = ['firstname', 'lastname', 'email','isPrincipal', 'workPhone','personalPhone', 'function'];
  expandedElement: Contact | null;

  constructor(private contactService: ContactService,
    public dialog: MatDialog, private snackBar: MatSnackBar) { 
      this.expandedElement  = null;
    }

  ngOnInit(): void {
    this.getContacts();
  } 

  getContacts(): void {
    this.contactService.getContacts().subscribe(contacts => this.contacts.data = contacts);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ContactAddComponentDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.getContacts();
      if (result) {this.openSnackBar("Editeur ajouté !")};
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

}

@Component({
  selector: 'app-contact-add',
  templateUrl: './add-contact.html',
  styleUrls: ['./add-contact.css']
})
export class ContactAddComponentDialog{

  confirmForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    workPhone: new FormControl('', [Validators.required]),
    personalPhone: new FormControl('', [Validators.required]),
    isPrincipal: new FormControl(false, [Validators.required]),
    street: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    fonction: new FormControl('', [Validators.required])
});

get firstname() {
  return this.confirmForm.value.firstname;
}
get lastname() {
  return this.confirmForm.value.lastname;
}
get email() {
  return this.confirmForm.value.email;
}
get workPhone() {
  return this.confirmForm.value.workPhone;
}
get personalPhone() {
  return this.confirmForm.value.personalPhone;
}
get isPrincipal() {
  return this.confirmForm.value.isPrincipal;
}
get street() {
  return this.confirmForm.value.street;
}
get postalCode() {
  return this.confirmForm.value.postalCode;
}
get city() {
  return this.confirmForm.value.city;
}
get fonction() {
  return this.confirmForm.value.fonction;
}

constructor(
  private editeurService: ContactService, public dialogRef: MatDialogRef<ContactAddComponentDialog>) { }

addContact() {
  this.editeurService.createContact(
    this.isPrincipal,
    this.firstname,
    this.lastname,
    this.email,
    this.personalPhone,
    this.workPhone,
    this.street,
    this.city,
    this.postalCode,
    this.fonction

).subscribe(
  () => {
    this.dialogRef.close(true);
  }
);

}
}
