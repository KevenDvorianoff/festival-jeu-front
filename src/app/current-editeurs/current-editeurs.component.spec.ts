import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentEditeursComponent } from './current-editeurs.component';

describe('CurrentEditeursComponent', () => {
  let component: CurrentEditeursComponent;
  let fixture: ComponentFixture<CurrentEditeursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentEditeursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentEditeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
