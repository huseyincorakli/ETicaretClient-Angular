import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAndOrderDetailDialogComponent } from './payment-and-order-detail-dialog.component';

describe('PaymentAndOrderDetailDialogComponent', () => {
  let component: PaymentAndOrderDetailDialogComponent;
  let fixture: ComponentFixture<PaymentAndOrderDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentAndOrderDetailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentAndOrderDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
