import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent extends BaseDialog<PaymentDetailComponent> implements OnInit {
  paymentDetail:any;
  constructor(
    dialogRef: MatDialogRef<PaymentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any | string,
   private orderService:OrderService
    ) {

    super(dialogRef)
  }
  async ngOnInit() {
   this.paymentDetail= await this.orderService.getPaymentDetail(this.data.paymentMethodId)
  }
}