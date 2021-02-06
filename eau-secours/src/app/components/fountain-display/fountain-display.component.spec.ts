import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FountainDisplayComponent } from './fountain-display.component';

describe('FountainDisplayComponent', () => {
  let component: FountainDisplayComponent;
  let fixture: ComponentFixture<FountainDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FountainDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FountainDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
