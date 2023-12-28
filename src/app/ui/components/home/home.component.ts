import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  brands:any=[]
  uniqueBrands = [];
  uniqueBrandNames = [];

  constructor(private productService:ProductService) {
  }


  async ngOnInit() {
      const brandData:any= (await this.productService.getBrands())
      this.brands=brandData.brands
      this.brands.forEach(brand => {
        if (!this.uniqueBrandNames.includes(brand.name)) {
          this.uniqueBrands.push(brand);
          this.uniqueBrandNames.push(brand.name);
        }
      });

      console.log(this.uniqueBrandNames);
      console.log(this.uniqueBrands);
      
      
  }


}
