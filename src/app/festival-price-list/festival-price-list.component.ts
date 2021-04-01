import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Price } from './price';
import { PriceService } from './price.service';
import { UpdatePriceComponentDialog } from './update-price.component';

@Component({
  selector: 'app-festival-price-list',
  templateUrl: './festival-price-list.component.html',
  providers: [PriceService],
  styleUrls: ['./festival-price-list.component.css']
})
export class FestivalPriceListComponent implements OnInit {

  @Input() festivalId!: number;

  columns: string[] = ['label', 'tableCount', 'm2Count', 'tablePrice', 'm2Price', 'reservedTableCount', 'reservedM2Count', 'restant', 'icons']
  prices = new MatTableDataSource<Price>([]);
  success: boolean = true;

  constructor(
    private priceService: PriceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPrices();
  }

  getPrices(): void {
    this.priceService.getPrices(this.festivalId).subscribe(prices => this.prices.data = prices);
  }

  getReservedTableCount(price: Price) {
    if (price.reservedTableCount !== null) {
      return price.reservedTableCount;
    }
    return 0;
  }

  getReservedM2Count(price: Price) {
    if (price.reservedTableCount !== null) {
      return price.reservedTableCount;
    }
    return 0;
  }

  getTableRestante(price: Price) {
    return price.tableCount - price.reservedTableCount;
  }

  openUpdateDialog(price: Price) {
    const dialogRef = this.dialog.open(UpdatePriceComponentDialog, {
      data: {success: this.success, price: price}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPrices();
      this.success = result;
      if (this.success) {this.openSnackBar("Jeu modifié !")};
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: ['snackbar-success']
    });
  }
}
