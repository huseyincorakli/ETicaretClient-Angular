import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClient: HttpClientService) {
    super(spinner)

  }
  ngOnInit(): void {
    //this.httpClient.get<Product[]>({ controller: 'products' }).subscribe()
    //this.httpClient.put({controller:'products'},{id:'3d2cd56b-bb97-4538-9959-899cf4394f3a',name:'angular-güncelleme-3',price:18,stock:11}).subscribe()
    //this.httpClient.delete({controller:'products'},'d71ee38e-17ce-4025-b99b-7a66bf49df78').subscribe()
    //this.httpClient.post({controller:'products'},{name:'angularclient',stock:10,price:15.5}).subscribe()
    //this.httpClient.get({baseUrl:'https://jsonplaceholder.typicode.com',controller:'photos'}).subscribe(data=>console.log(data))
  }


}
