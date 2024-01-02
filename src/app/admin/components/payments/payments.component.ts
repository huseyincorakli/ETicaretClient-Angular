import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  completedPayments: any;
  completedPaymentSize: number = 5;
  constructor(private orderService: OrderService) {
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
    
    const size = this.completedPaymentSize+3
    this.completedPayments= await this.getCompletedPayments(size);
  }
}
