import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: any = []
  uniqueBrands = [];
  uniqueBrandNames = [];
  isLoading: boolean ;

  constructor(private productService: ProductService) {
  }


  async ngOnInit() {
    this.isLoading = true;
   await this.delay(5000);
    await this.getBrands();
    this.isLoading = false;

  }

  async getBrands() {
    
    const brandData: any = (await this.productService.getBrands())
    this.brands = brandData.brands
    this.brands.forEach(brand => {
      if (!this.uniqueBrandNames.includes(brand.name)) {
        this.uniqueBrands.push(brand);
        this.uniqueBrandNames.push(brand.name);
      }
    });
  }
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
