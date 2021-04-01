import { Component, OnInit, Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Contact } from './contact';
import { MatTableDataSource } from '@angular/material/table';
import { ContactService } from './contacts.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditeursService } from '../editeurs/editeurs.services';
import { Editeur } from '../editeurs/editeur';
import { HashTable } from 'angular-hashtable';
import { HttpErrorResponse } from '@angular/common/http';

export interface Cont{
  contact: Contact
}

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

  columnsToDisplay  = ['firstname', 'lastname', 'email','isPrincipal', 'workPhone','personalPhone', 'function', 'companyName'];
  columnsName = new HashTable<string,string>();
  expandedElement: Contact | null;


  constructor(private contactService: ContactService,
    public dialog: MatDialog, private snackBar: MatSnackBar) { 
      this.expandedElement  = null;

      this.columnsName.put('firstname','Prénom')
      this.columnsName.put('lastname','Nom de famille')
      this.columnsName.put('email','Email')
      this.columnsName.put('isPrincipal','Contact principal')
      this.columnsName.put('workPhone','Numéro pro')
      this.columnsName.put('personalPhone','Numéro perso')
      this.columnsName.put('function','Fonction')
      this.columnsName.put('companyName','Exposant/Editeur')
    }

  ngOnInit(): void {
    this.getContacts();
  } 

  getContacts(): void {
    this.contactService.getContacts().subscribe(contacts => this.contacts.data = contacts);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.contacts.filter = filterValue.trim().toLowerCase();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ContactAddComponentDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.getContacts();
      if (result) {this.openSnackBar("Contact ajouté !")};
    });
  }
 
  openEditDialog(contact: Contact): void{
    const dialogRef = this.dialog.open(ContactEditComponentDialog,
      {
        data : {contact}
      })

    dialogRef.afterClosed().subscribe(result => {
      this.getContacts();
      if (result) {this.openSnackBar("Contact modifié !")};
    });
  }

  openDeleteDialog(contact: Contact): void {
    const dialogRef = this.dialog.open(DeleteContactComponentDialog, {
      data: {success: false, contactFirstName: contact.firstname,contactLastName:contact.lastname, contactId: contact.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getContacts();
      if (result) {this.openSnackBar("Contact supprimé !")};
    })
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
  providers: [ContactService],
  styleUrls: ['./add-contact.css']
})
export class ContactAddComponentDialog implements OnInit{

  editeurs: Editeur[] = []

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
    fonction: new FormControl('', [Validators.required]),
    companyId: new FormControl('', [Validators.required])
});

ngOnInit(){
  this.editeurService.getEditeurs().subscribe(editeurs => this.editeurs = editeurs);
}

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
get companyId(){
  return this.confirmForm.value.companyId
}

constructor(
  private contactService: ContactService, public dialogRef: MatDialogRef<ContactAddComponentDialog>, private editeurService: EditeursService) { }

addContact() {
  this.contactService.createContact(
    this.isPrincipal,
    this.firstname,
    this.lastname,
    this.email,
    this.personalPhone,
    this.workPhone,
    this.street,
    this.city,
    this.postalCode,
    this.fonction,
    this.companyId

).subscribe(
  () => {
    this.dialogRef.close(true);
  }
);

}
}

@Component({
  selector: 'app-contact-edit',
  templateUrl: './edit-contact.html',
  providers: [ContactService],
  styleUrls: ['./add-contact.css']
})


export class ContactEditComponentDialog{

  confirmForm = new FormGroup({
    firstname: new FormControl(this.data.contact.firstname, [Validators.required]),
    lastname: new FormControl(this.data.contact.lastname, [Validators.required]),
    email: new FormControl(this.data.contact.email, [Validators.required]),
    workPhone: new FormControl(this.data.contact.workPhone, [Validators.required]),
    personalPhone: new FormControl(this.data.contact.personalPhone, [Validators.required]),
    isPrincipal: new FormControl(this.data.contact.isPrincipal, [Validators.required]),
    street: new FormControl(this.data.contact.street, [Validators.required]),
    postalCode: new FormControl(this.data.contact.postalCode, [Validators.required]),
    city: new FormControl(this.data.contact.city, [Validators.required]),
    fonction: new FormControl(this.data.contact.function, [Validators.required]),
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
  private contactService: ContactService, 
  public dialogRef: MatDialogRef<ContactAddComponentDialog>,
  @Inject(MAT_DIALOG_DATA) public data: Cont) { }

editContact() {
  this.contactService.updateContact(
    this.data.contact.id,
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


interface DialogData {
  success: boolean;
  contactFirstName: string;
  contactLastName: string;
  contactId: number;
}

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.html',
  providers: [ContactService],
  styleUrls: ['./delete-contact.css']
})
export class DeleteContactComponentDialog implements OnInit {

  error?: string;

  constructor(
    private contactService: ContactService,
    private dialogRef: MatDialogRef<DeleteContactComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  deleteContact() {
    this.error = undefined;

    this.contactService.deleteContact(this.data.contactId).subscribe(
      () => {
        this.data.success = true,
        this.dialogRef.close(this.data.success);
      },
      (e: HttpErrorResponse) => {
        this.error = 'Impossible de supprimer le jeu.';
      }
    )
  }

}
