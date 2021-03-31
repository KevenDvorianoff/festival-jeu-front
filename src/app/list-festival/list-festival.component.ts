import { Component, OnInit } from '@angular/core';
import { FestivalService } from './festival.service';
import { Festival } from './festival';

@Component({
  selector: 'app-festivals',
  templateUrl: './list-festival.component.html',
  providers: [FestivalService],
  styleUrls: ['./list-festival.component.css']
})
export class ListFestivalComponent implements OnInit {

  festivals!: Festival[];

  constructor(
    private festivalService: FestivalService
  ) { }

  ngOnInit() {
    this.getFestivals();
  }
  
  getFestivals(): void {
    this.festivalService.getFestivals().subscribe(festivals => { this.festivals = festivals; });
  }

  openAddFestivalDialog() {}

  openUpdateFestivalDialog(festival: Festival) {}

}

