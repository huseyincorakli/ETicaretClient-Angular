import { Component, OnInit } from '@angular/core';
import { PaymentDetailComponent } from 'src/app/dialogs/payment-detail/payment-detail.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  completedPayments: any;
  completedPaymentSize: number = 5;
  constructor(
    private orderService: OrderService,
    private dialogService:DialogService) {
  }

  async ngOnInit() {
    await this.getCompletedPayments();

  }

  async getCompletedPayments(size?: number) {
    if (size) {
      this.completedPayments = await this.orderService.getCompletedPayments(size);
    }
    else {
      this.completedPayments = await this.orderService.getCompletedPayments(this.completedPaymentSize);

    }
  }

  async moreCompletedPayment(){
    console.log("çalıştır");
    
    this.completedPaymentSize+=3;
    this.completedPayments= await this.orderService.getCompletedPayments(this.completedPaymentSize);
  }

  async getDetail(paymentMethodId:string){
    this.dialogService.openDialog({
      componentType:PaymentDetailComponent,
      data:{paymentMethodId},
      options:{
        width:'700px',
        height:'150px'
      }
    })
  }
}
