import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftcardEditableComponent } from './giftcard-editable.component';

describe('GiftcardEditableComponent', () => {
  let component: GiftcardEditableComponent;
  let fixture: ComponentFixture<GiftcardEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftcardEditableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftcardEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
