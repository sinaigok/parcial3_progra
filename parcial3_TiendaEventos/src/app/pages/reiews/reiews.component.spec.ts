import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReiewsComponent } from './reiews.component';

describe('ReiewsComponent', () => {
  let component: ReiewsComponent;
  let fixture: ComponentFixture<ReiewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReiewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReiewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
