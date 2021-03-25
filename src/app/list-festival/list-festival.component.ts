import { Component, OnInit } from '@angular/core';
import { ListFestivals, ListFestivalService } from './list-festival.service';

@Component({
  selector: 'app-test',
  templateUrl: './list-festival.component.html',
  providers: [ ListFestivalService ],
  styleUrls: ['./list-festival.component.css']
})
export class ListFestivalComponent{
  error: any;
  headers: string[] | undefined;
  listfestivals: ListFestivals | undefined; 


  constructor(private listfestivalservice: ListFestivalService) { }
  

  showConfig_v2() {
    this.listfestivalservice.getConfig2()
      .subscribe((data: ListFestivals) => this.listfestivals = { ...data });
  }
  

}