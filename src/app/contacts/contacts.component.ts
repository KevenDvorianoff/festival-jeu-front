import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Contact } from './contact';
import { MatTableDataSource } from '@angular/material/table';
import { ContactService } from './contacts.service';
import { MatDialog } from '@angular/material/dialog';

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

  columnsToDisplay  = ['fistname', 'lastname', 'email', 'workPhone', 'function'];
  expandedElement: Contact | null;

  constructor(private contactService: ContactService,
    public dialog: MatDialog) { 
      this.expandedElement  = null;
    }

  ngOnInit(): void {
    this.getContacts();
  } 

  getContacts(): void {
    this.contactService.getContacts().subscribe(contacts => this.contacts.data = contacts);
  }

}
