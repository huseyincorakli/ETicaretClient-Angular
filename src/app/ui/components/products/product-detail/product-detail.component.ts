import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { List_Product } from 'src/app/contracts/list_product';
import { Product_Details } from 'src/app/contracts/products/product_detail';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private fileService: FileService
  ) {
    super(spinner)
  }
  product: Product_Details
  baseUrl: BaseUrl;

  async ngOnInit(): Promise<void> {
    this.showSpinner(SpinnerType.Classic)

    this.baseUrl = await this.fileService.getBaseStorageUrl()
    var productId = this.activatedRoute.snapshot.paramMap.get('productId')
    this.product = await this.productService.readById(productId)
    
    this.hideSpinner(SpinnerType.Classic)

  }


}
