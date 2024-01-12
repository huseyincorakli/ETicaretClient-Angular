import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';
import { RefundsService } from 'src/app/services/common/models/refunds.service';

@Component({
  selector: 'app-payment-and-order-detail-dialog',
  templateUrl: './payment-and-order-detail-dialog.component.html',
  styleUrls: ['./payment-and-order-detail-dialog.component.scss']
})
export class PaymentAndOrderDetailDialogComponent  extends BaseDialog<PaymentAndOrderDetailDialogComponent> implements OnInit {
  
  

  constructor(dialogRef: MatDialogRef<PaymentAndOrderDetailDialogComponent>,
    private orderService:OrderService,
    private refundService:RefundsService,
    @Inject(MAT_DIALOG_DATA) public data: any | string,) {
    super(dialogRef);
    
  }
  async ngOnInit() {
    //order
    const abc = await this.orderService.getOrderByOrdercode(this.data.code);
    //payments
    const xyz = await this.refundService.getPaymentsByEmail(this.data.mail)

    //kullanıcıya bunları ver ama iade sonucunu admin belirlesin
    debugger
  }

}
