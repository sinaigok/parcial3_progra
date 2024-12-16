import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearReviewComponent } from './crear-review.component';

describe('CrearReviewComponent', () => {
  let component: CrearReviewComponent;
  let fixture: ComponentFixture<CrearReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
