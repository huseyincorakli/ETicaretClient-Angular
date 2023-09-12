import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';
import { SingleOrder } from 'src/app/contracts/order/single_order';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CompleteOrderDialogComponent, CompleteOrderState } from '../complete-order-dialog/complete-order-dialog.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService: OrderService,
    private dialogService:DialogService,
    private spinner:NgxSpinnerService,
    private alertify:AlertifyService
    ) {

    super(dialogRef)
  }

  singleOrder: SingleOrder;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice:number;

  async ngOnInit() {
    this.singleOrder = await this.orderService.getOrderById(this.data as string)
    this.dataSource = this.singleOrder.basketItems

    this.totalPrice=this.singleOrder.basketItems.map((basketItem,index)=>basketItem.price*basketItem.quantity).reduce((price,current)=>price+current);
  }

completeOrder(){
  this.dialogService.openDialog({
    componentType:CompleteOrderDialogComponent,
    data:CompleteOrderState.Yes,
    afterClosed:async()=>{
      this.spinner.show(SpinnerType.Classic)
     await this.orderService.completeOrder(this.data as string).then(value=>{
      this.spinner.hide(SpinnerType.Classic)
      this.alertify.message("Sipariş tamamlandı",{
       messageType:MessageType.Success,
       position:Position.TopRight
      })
     }).catch(error=>{
      this.spinner.hide(SpinnerType.Classic)
      this.alertify.message(`Hata : ${error}`,{
        messageType:MessageType.Error,
        position:Position.TopCenter
       })
     });
     
    }
  })
  
}

}
export enum OrderDetailDialogState {
  Close, OrderComplete
}



