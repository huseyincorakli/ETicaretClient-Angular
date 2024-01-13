import { Component, OnInit } from '@angular/core';
import { PaymentAndOrderDetailDialogComponent } from 'src/app/dialogs/payment-and-order-detail-dialog/payment-and-order-detail-dialog.component';
import { PaymentDetailComponent } from 'src/app/dialogs/payment-detail/payment-detail.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { RefundsService } from 'src/app/services/common/models/refunds.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  completedPayments: any;
  completedPaymentsFullData: any;
  completedPaymentSize: number = 5;
  refundSize: number = 4;
  refunds: any = [];
  userMail: any;
  constructor(
    private orderService: OrderService,
    private dialogService: DialogService,
    private refundService: RefundsService,
    private userService: UserService) {
  }

  async ngOnInit() {
    await this.getCompletedPayments(7);
    await this.getAllRefunds(this.refundSize);
    this.userMail = (await this.userService.getUserById(localStorage.getItem('userId'))).updateProfile.email;
  }

  async getAllRefunds(size: number) {
    this.refunds = await this.refundService.getAllRefund(size)
  }
  async getAllRefundsx(size: number) {
    return await this.refundService.getAllRefund(size);
  }

  async refreshData(){
   await this.getAllRefunds(this.refundSize)
  }
  getData(code: string,refundReason:string,returnStatus:string,id:string) {
    const mail = this.userMail;
    this.dialogService.openDialog({
      componentType: PaymentAndOrderDetailDialogComponent,
      data: { code, mail,refundReason,returnStatus,id },
      options: {
        width: '800px',
        height: '495px'
      }
    })
  }

  async getCompletedPayments(size?: number) {
    if (size) {
      this.completedPayments = await this.orderService.getCompletedPayments(size);

      await Promise.all(this.completedPayments.map(async (element) => {
        const paymentDetails = await this.orderService.getPaymentDetail(element.paymentMethodId);
        // Elde edilen veriyi completedPayments'e ekleyin
        element.paymentDetail = paymentDetails;
      }));
    }
    else {
      this.completedPayments = await this.orderService.getCompletedPayments(this.completedPaymentSize);
      await Promise.all(this.completedPayments.map(async (element) => {
        const paymentDetails = await this.orderService.getPaymentDetail(element.paymentMethodId);
        // Elde edilen veriyi completedPayments'e ekleyin
        element.paymentDetail = paymentDetails;
      }));

    }
  }

  async moreRefunds() {
    this.refundSize += 2;
    this.refunds = await this.getAllRefundsx(this.refundSize);
  }
  async moreCompletedPayment() {

    this.completedPaymentSize = this.completedPaymentSize + 2;
    this.completedPayments = await this.orderService.getCompletedPayments(this.completedPaymentSize);

    await Promise.all(this.completedPayments.map(async (element) => {
      const paymentDetails = await this.orderService.getPaymentDetail(element.paymentMethodId);
      element.paymentDetail = paymentDetails;
    }));
  }

  async getDetail(paymentMethodId: string) {
    this.dialogService.openDialog({
      componentType: PaymentDetailComponent,
      data: { paymentMethodId },
      options: {
        width: '700px',
        height: '150px'
      }
    })
  }
}
