import { Component, OnInit } from '@angular/core';
import { Get_Home_Setting } from 'src/app/contracts/home-settings/get-home-settings';
import { ProductSelling } from 'src/app/contracts/products/best_selling_product_size';
import { FileService } from 'src/app/services/common/models/file.service';
import { HomeSettingService } from 'src/app/services/common/models/home-setting.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent  implements OnInit {
  baseUrl: string;
  isLoading:boolean=false;
  homeSetting:Get_Home_Setting;
  constructor(
     private fileService: FileService,
     private homeSettingService:HomeSettingService) {
  
    
  }
  async ngOnInit() {
    this.isLoading=true;
    this.homeSetting= await this.homeSettingService.getSetting()
    this.baseUrl = (await this.fileService.getBaseStorageUrl()).url
    this.isLoading=false;
  }


}
