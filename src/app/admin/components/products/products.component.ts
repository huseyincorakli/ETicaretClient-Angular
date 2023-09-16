import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';

import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { QrcodeReadingDialogComponent } from 'src/app/dialogs/qrcode-reading-dialog/qrcode-reading-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClient: HttpClientService,private dialogService:DialogService) {
    super(spinner)

  }
  @ViewChild(ListComponent) listComponents:ListComponent;
  createdProduct(create_product:Create_Product){
    this.listComponents.getProducts();
  }
  
  ngOnInit(): void {
    //this.httpClient.get<Product[]>({ controller: 'products' }).subscribe()
    //this.httpClient.put({controller:'products'},{id:'3d2cd56b-bb97-4538-9959-899cf4394f3a',name:'angular-güncelleme-3',price:18,stock:11}).subscribe()
    //this.httpClient.delete({controller:'products'},'d71ee38e-17ce-4025-b99b-7a66bf49df78').subscribe()
    //this.httpClient.post({controller:'products'},{name:'angularclient',stock:10,price:15.5}).subscribe()
    //this.httpClient.get({baseUrl:'https://jsonplaceholder.typicode.com',controller:'photos'}).subscribe(data=>console.log(data))
  }
  showProductQrCodeReading(){
    this.dialogService.openDialog({
      componentType:QrcodeReadingDialogComponent,
      options:{
        width:"500px",
        height:"600px"
      }
    })
  }

}
