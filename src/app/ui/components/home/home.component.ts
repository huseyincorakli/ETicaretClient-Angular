import { Component, OnInit,HostListener  } from '@angular/core';
import { ProductSelling } from 'src/app/contracts/products/best_selling_product_size';
import { ProductService } from 'src/app/services/common/models/product.service';
import { SlicePipe } from '@angular/common';
import { BaseUrl } from 'src/app/contracts/base_url';
import { FileService } from 'src/app/services/common/models/file.service';
import { HomeSettingService } from 'src/app/services/common/models/home-setting.service';
import { Get_Home_Setting } from 'src/app/contracts/home-settings/get-home-settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading: boolean=false;
  baseUrl: BaseUrl;
  originalProductSellings: ProductSelling[] = [];
  groupedProductSellings: ProductSelling[][] = [];
  homeSetting:Get_Home_Setting;
  constructor(
    private productService: ProductService,
    private fileService: FileService,
    private homeSettingService:HomeSettingService ) {
  }


  
  async ngOnInit() {
   this.homeSetting= await this.homeSettingService.getSetting()
    this.baseUrl = await this.fileService.getBaseStorageUrl()
     await this.getProducts(this.homeSetting.numberOfFeaturedProducts);
    this.groupProducts();
  }

  async getProducts(size:number) {
    this.isLoading=true;
    const result = await this.productService.getBestSellingBySize(size);
    this.originalProductSellings = result.productSellings;
    this.isLoading=false;


  }
  groupProducts() {
    for (let i = 0; i < this.originalProductSellings.length; i += 2) {
      this.groupedProductSellings.push(this.originalProductSellings.slice(i, i + 2));
    }
  }

}

