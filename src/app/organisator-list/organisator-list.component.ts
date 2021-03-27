import { Component, OnInit } from '@angular/core';
import { Organisator } from './organisator';
import { OrganisatorService } from './organisator.service';

@Component({
  selector: 'app-organisator-list',
  templateUrl: './organisator-list.component.html',
  providers: [OrganisatorService],
  styleUrls: ['./organisator-list.component.css']
})
export class OrganisatorListComponent implements OnInit {
  organisators: Organisator[] = [];

  constructor(private organisatorService: OrganisatorService) { }

  ngOnInit(): void {
    this.getOrganisators();
  }
  getOrganisators(): void {
    this.organisatorService.getOrganisators().subscribe(organisators => {this.organisators = organisators})
  }
}
