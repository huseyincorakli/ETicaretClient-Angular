import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { Product_Details } from 'src/app/contracts/products/product_detail';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent extends BaseComponent implements OnInit  {
  constructor(
    spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private fileService: FileService,
    private basketService: BasketService,
    private toastr:CustomToastrService,

  ) {
    super(spinner)
  }
  product: Product_Details
  baseUrl: BaseUrl;
  selectedImage:any;
  productId:string;
  
  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.Classic)

    this.baseUrl = await this.fileService.getBaseStorageUrl()
    this.productId= this.activatedRoute.snapshot.paramMap.get('productId')
    this.product = await this.productService.readById(this.productId)

    if (this.product && this.product.imageFiles && this.product.imageFiles.length > 0) {
      this.selectedImage = this.product.imageFiles[0].path;
    }
    this.activatedRoute.paramMap.subscribe(params => {
      this.updateProductDetails(params.get('productId'))
    });
    this.hideSpinner(SpinnerType.Classic)
  }

  private async updateProductDetails(productId: string) {
    console.log("burası çalıştı");
    this.product = await this.productService.readById(productId);

    if (this.product && this.product.imageFiles && this.product.imageFiles.length > 0) {
      this.selectedImage = this.product.imageFiles[0].path;
    }
  }

  changeSelectedImage(index: number): void {
    this.selectedImage = this.product.imageFiles[index].path;    
  }
  
  async addToBasket(txtQuantityValue:HTMLInputElement){
    this.showSpinner(SpinnerType.Classic)
  var productId = this.activatedRoute.snapshot.paramMap.get('productId')
  let _basketItem: Create_Basket_Item = new Create_Basket_Item();
  _basketItem.productId = productId;
  _basketItem.quantity = parseInt(txtQuantityValue.value);
  await this.basketService.add(_basketItem).then(()=>{
    this.toastr.message("BAŞARILI","ÜRÜN SEPETE EKLENDİ",ToastrMessageType.Success,ToastrPosition.TopRight)
  }).catch()
  this.hideSpinner(SpinnerType.Classic)

}

}
