import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FountainPopupComponent } from './fountain-popup.component';

describe('FountainPopupComponent', () => {
  let component: FountainPopupComponent;
  let fixture: ComponentFixture<FountainPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FountainPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FountainPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
