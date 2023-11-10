import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-get-product-by-category',
  templateUrl: './get-product-by-category.component.html',
  styleUrls: ['./get-product-by-category.component.scss']
})
export class GetProductByCategoryComponent extends BaseComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    spinner: NgxSpinnerService,
    private basketService: BasketService,
    private toastr: CustomToastrService
  ) {
    super(spinner)
  }

  products: any;
  productName:string;
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  baseUrl: BaseUrl;
  pageList: number[] = [];
  categoryId: string;
  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl()

    this.activatedRoute.params.subscribe(async params => {
      this.showSpinner(SpinnerType.Classic)
      this.categoryId = params["categoryId"];


      if (parseInt(params["pageNo"]) <= 0 || params["pageNo"] == undefined) {
        this.currentPageNo = 1

      }
      else {
        this.currentPageNo = parseInt(params["pageNo"])
      }

      const data: { totalProductCount: number, products: List_Product[] } =
        await this.productService.readByCategory(this.currentPageNo - 1, this.pageSize, this.categoryId,'', () => {
          this.hideSpinner(SpinnerType.Classic)
        }, errorMessage => {

        })


      this.products = data.products.map<List_Product>(p => {


        const listProduct: List_Product = {

          id: p.id,
          createDate: p.createDate,
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : '',
          categoryName:p.categoryName,
          isActive:p.isActive
        }
      return listProduct
      })
      this.totalProductCount = data.totalProductCount

      this.hideSpinner(SpinnerType.Classic)
    });


  }
  async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerType.Clock)
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.Clock);
    this.toastr.message('BAŞARILI', 'ÜRÜN SEPETE EKLENDİ', ToastrMessageType.Success, ToastrPosition.TopRight);
  }
   async searchProducts(){
    if (this.productName) {
      
      const data: { totalProductCount: number, products: List_Product[] } = await this.productService.read(
        this.currentPageNo - 1,
        this.pageSize,
       this.productName,()=>{},()=>{}
      );
  
      this.products = data.products.map(p => {
        return {
          ...p,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(img => img.showcase).path : ''
        };
      });
      
      
    } else {
      this.ngOnInit(); 
    }

  }


}
