import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { QrcodeDialogComponent } from 'src/app/dialogs/qrcode-dialog/qrcode-dialog.component';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private dialogService:DialogService
      
      ) {
    super(spinner)
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'price', 'stock',"categoryName", 'createDate', 'updatedDate', 'photos','qrcode','edit', 'delete'];
  dataSource: MatTableDataSource<List_Product> = null;

  
  async getProducts() {
    this.showSpinner(SpinnerType.Clock)
    const allProducts: { totalProductCount: number, products: List_Product[] } =
      await this.productService.read(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.Clock),
        errorMessage => {
          this.alertify.message(errorMessage,
            { dismissOthers: true, messageType: MessageType.Error, position: Position.TopRight })
        })
       
     
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products)
    this.paginator.length = allProducts.totalProductCount
  }
  async pageChange() {
    await this.getProducts();
  }

  async ngOnInit() {
    await this.getProducts();
  }
  showQRCode(productId:string,name:string){
    this.dialogService.openDialog({
      componentType:QrcodeDialogComponent,
      data:{productId:productId,name:name},
      options:{
        width:"400px"
      }
    })
  }

  addProductImages(id:string){
    this.dialogService.openDialog({
      componentType:SelectProductImageDialogComponent,
      data:id,
      options:{
        width:"1000px"
      }
    })
  }
}
