import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFestivalComponent } from './list-festival.component';

describe('ListFestivalComponent', () => {
  let component: ListFestivalComponent;
  let fixture: ComponentFixture<ListFestivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFestivalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
