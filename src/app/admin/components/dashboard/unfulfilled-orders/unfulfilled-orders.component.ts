import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-unfulfilled-orders',
  templateUrl: './unfulfilled-orders.component.html',
  styleUrls: ['./unfulfilled-orders.component.scss']
})
export class UnfulfilledOrdersComponent extends BaseComponent implements OnInit {
constructor(private orderService:OrderService,spinner:NgxSpinnerService) {
super(spinner)
}
isLoading:boolean=true;
UnCompletedOrder:any = []
startValue:number=4;
  async ngOnInit(): Promise<void> {
    await this.getUncompletedOrder(this.startValue);
  }
  async getData(data:any){
    this.getUncompletedOrder(data.target.value)
    this.startValue=data.target.value
  }


  async getUncompletedOrder(size:number){
    this.isLoading=true;
    this.UnCompletedOrder = (await this.orderService.getUnCompletedOrders(size)).unCompletedDatas.orders;
this.isLoading=false;  
  }
}
