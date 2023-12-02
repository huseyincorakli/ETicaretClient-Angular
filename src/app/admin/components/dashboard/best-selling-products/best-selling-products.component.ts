import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Best_Selling_Product } from 'src/app/contracts/products/best_selling_product';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-best-selling-products',
  templateUrl: './best-selling-products.component.html',
  styleUrls: ['./best-selling-products.component.scss']
})
export class BestSellingProductsComponent implements OnInit, AfterViewInit{
  isLoading:boolean=false;
  productName1:string
  productName2:string
  productName3:string
  productId1:string
  productId2:string
  productId3:string
  
  constructor(private productService:ProductService) {
  }
  products:any
  async ngOnInit(): Promise<void> {
    this.isLoading=true
     this.products= (await this.productService.getBestSellingProduct()).bestSellingProduct
     this.productName1=this.products.bestSellingProducts[0].name
     this.productName2=this.products.bestSellingProducts[1].name
     this.productName3=this.products.bestSellingProducts[2].name
     this.productId1=this.products.bestSellingProducts[0].id
     this.productId2=this.products.bestSellingProducts[1].id
     this.productId3=this.products.bestSellingProducts[2].id
     this.isLoading=false
    this.createDoughnutChart();

  }


  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef;
  doughnutChart: any;

  ngAfterViewInit(): void {

  }

  createDoughnutChart(): void {
    const doughnutCanvas = this.doughnutCanvas.nativeElement.getContext('2d');
    this.doughnutChart = new Chart(doughnutCanvas, {
      type: 'doughnut',
      data: {
        labels: [this.products.bestSellingProducts[0].name.slice(0,10)+'...', this.products.bestSellingProducts[1].name.slice(0,10)+'...', this.products.bestSellingProducts[2].name],
        datasets: [{
          data: [this.products.bestSellingProducts[0].quantitySold, this.products.bestSellingProducts[1].quantitySold, this.products.bestSellingProducts[2].quantitySold],
          backgroundColor: ['red', 'green', 'blue']
        }]
      }
    });
  }
}
