import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGiftcardComponent } from './new-giftcard.component';

describe('NewGiftcardComponent', () => {
  let component: NewGiftcardComponent;
  let fixture: ComponentFixture<NewGiftcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGiftcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGiftcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
