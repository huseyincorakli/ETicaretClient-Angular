import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { RefundDialogComponent } from 'src/app/dialogs/refund-dialog/refund-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent extends BaseComponent implements OnInit {
 
  constructor(
    private orderService:OrderService,
    spinner:NgxSpinnerService,
    private toastr:CustomToastrService,
    private userService:UserService,
    private dialogService:DialogService) {   
    super(spinner)
  }
  panelOpenState:boolean = false;
  userId:string;
  orderSize:number=5;
  maxOrderSize:number;
  orders:any=[];
  user:any;
  basketOrder:any;
  isLoading:boolean;
  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.Classic)
     this.userId= localStorage.getItem("userId");
     this.user= await this.userService.getUserById(this.userId);
    const userOrders:any= await this.orderService.getOrderByUserId(this.userId,this.orderSize);
    this.maxOrderSize=userOrders.totalOrderCount
    this.orders=userOrders.orders;
    this.hideSpinner(SpinnerType.Classic)

  }
  
  async getOrderDetail(state:boolean,id:string) {
    if (!state) {
    this.isLoading=true;
    this.basketOrder=  await this.orderService.getOrderById(id)
    this.isLoading=false;

    }
  }
  async getMoreOrder() {
    if (this.orderSize < this.maxOrderSize) {
      this.orderSize += 2;
      const userOrders: any = await this.orderService.getOrderByUserId(this.userId, this.orderSize);
      this.orders = userOrders.orders;
    } else {
      this.toastr.message("Daha fazla siparişiniz bulunmamaktadır.","",ToastrMessageType.Info,ToastrPosition.BottomRight)
    }
  }
  refund(orderCode:string){
    this.dialogService.openDialog({
      componentType:RefundDialogComponent,
      data:{nameSurname:this.user.updateProfile.nameSurname,email:this.user.updateProfile.email,
      orderCode:orderCode},
      options:{
        width:'400px',
        height:'410px'
      }
    })
  }
}
