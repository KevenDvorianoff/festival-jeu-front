import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from './invoice';
import { InvoiceService } from './invoice.service';
import { UpdateInvoiceComponentDialog } from './update-invoice.component';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit, AfterViewInit {

  columns: string[] = ['companyName', 'price', 'discount', 'finalPrice', 'sentDate', 'paymentDate', 'icons'];
  invoices = new MatTableDataSource<Invoice>([]);
  success: boolean = true;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private invoiceService: InvoiceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  ngAfterViewInit() {
    this.invoices.sort = this.sort;
    this.invoices.paginator = this.paginator;
  }

  getInvoices() {
    this.invoiceService.getInvoices().subscribe(invoices => this.invoices.data = invoices);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.invoices.filter = filterValue.trim().toLowerCase();

    if (this.invoices.paginator) {
      this.invoices.paginator.firstPage();
    }
  }

  openUpdateDialog(invoice: Invoice): void {
    const dialogRef = this.dialog.open(UpdateInvoiceComponentDialog, {
      data: {success: this.success, invoice: invoice}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getInvoices();
      this.success = result;
      if (this.success) {this.openSnackBar("Facture modifié !")};
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }

}
