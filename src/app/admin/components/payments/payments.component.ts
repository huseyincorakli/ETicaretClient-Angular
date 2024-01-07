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
  completedPaymentsFullData:any;
  completedPaymentSize: number = 5;
  constructor(
    private orderService: OrderService,
    private dialogService:DialogService) {
  }

  async ngOnInit() {
    await this.getCompletedPayments(7);

  }

  async getCompletedPayments(size?: number) {
    if (size) {
      this.completedPayments = await this.orderService.getCompletedPayments(size);

      await Promise.all(this.completedPayments.map(async (element) => {
        const paymentDetails = await this.orderService.getPaymentDetail(element.paymentMethodId);
        // Elde edilen veriyi completedPayments'e ekleyin
        element.paymentDetail = paymentDetails;
      }));
      debugger
    }
    else {
      this.completedPayments = await this.orderService.getCompletedPayments(this.completedPaymentSize);
      await Promise.all(this.completedPayments.map(async (element) => {
        const paymentDetails = await this.orderService.getPaymentDetail(element.paymentMethodId);
        // Elde edilen veriyi completedPayments'e ekleyin
        element.paymentDetail = paymentDetails;
      }));
      debugger

    }
  }

  async moreCompletedPayment(){
    console.log("çalıştır");
    
    this.completedPaymentSize=this.completedPaymentSize+2;
    this.completedPayments= await this.orderService.getCompletedPayments(this.completedPaymentSize);
    debugger

    await Promise.all(this.completedPayments.map(async (element) => {
      const paymentDetails = await this.orderService.getPaymentDetail(element.paymentMethodId);
      element.paymentDetail = paymentDetails;
    }));
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
