import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Price } from './price';
import { PriceService } from './price.service';

@Component({
  selector: 'app-festival-price-list',
  templateUrl: './festival-price-list.component.html',
  providers: [PriceService],
  styleUrls: ['./festival-price-list.component.css']
})
export class FestivalPriceListComponent implements OnInit {

  @Input() festivalId!: number;

  columns: string[] = ['label', 'tableCount', 'm2Count', 'tablePrice', 'm2Price', 'reservedTableCount', 'reservedM2Count', 'restant']
  prices = new MatTableDataSource<Price>([]);

  constructor(
    private priceService: PriceService
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
}
