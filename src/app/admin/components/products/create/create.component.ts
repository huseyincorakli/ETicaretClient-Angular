import { Component,OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(private productService:ProductService,private spiner:NgxSpinnerService,
    private alertify:AlertifyService){
    super(spiner)
  }

  ngOnInit(): void {}

  create(name:HTMLInputElement,price:HTMLInputElement,stock:HTMLInputElement){
  this.showSpinner(SpinnerType.Classic)
  const create_product:Create_Product= new Create_Product();
  create_product.name=name.value;
  create_product.price=parseFloat(price.value);
  create_product.stock=parseInt(stock.value)

  this.productService.create(create_product,()=>{
    this.hideSpinner(SpinnerType.Classic)
    this.alertify.message('Ürün Ekleme Başarılı',{messageType:MessageType.Success,position:Position.TopRight})
  })
  }
}
