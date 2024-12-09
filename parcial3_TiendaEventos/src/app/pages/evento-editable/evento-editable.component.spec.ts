import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoEditableComponent } from './evento-editable.component';

describe('EventoEditableComponent', () => {
  let component: EventoEditableComponent;
  let fixture: ComponentFixture<EventoEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoEditableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
