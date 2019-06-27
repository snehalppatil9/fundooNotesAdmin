import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarddetailsComponent } from './carddetails.component';

describe('CarddetailsComponent', () => {
  let component: CarddetailsComponent;
  let fixture: ComponentFixture<CarddetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarddetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
