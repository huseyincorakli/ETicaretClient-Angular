import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfulfilledOrdersComponent } from './unfulfilled-orders.component';

describe('UnfulfilledOrdersComponent', () => {
  let component: UnfulfilledOrdersComponent;
  let fixture: ComponentFixture<UnfulfilledOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnfulfilledOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnfulfilledOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
