import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Order } from 'src/app/contracts/order/list_order';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent {
  constructor(
    private orderService: OrderService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private dialogService:DialogService
      
      ) {
    super(spinner)
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice', 'createDate', 'delete'];
  dataSource: MatTableDataSource<List_Order> = null;

  
  async getOrders() {
    this.showSpinner(SpinnerType.Clock)
    const allOrders: { totalOrderCount: number, orders: List_Order[] } =
      await this.orderService.getAllOrders(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.Clock),
        errorMessage => {
          this.alertify.message(errorMessage,
            { dismissOthers: true, messageType: MessageType.Error, position: Position.TopRight })
        })
      
    this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders)
    this.paginator.length = allOrders.totalOrderCount
  }
  async pageChange() {
    await this.getOrders();
  }

  async ngOnInit() {
    await this.getOrders();
  }

  
}
