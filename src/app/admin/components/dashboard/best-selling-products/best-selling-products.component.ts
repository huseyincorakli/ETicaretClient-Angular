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

  
  constructor(private productService:ProductService) {
  }
  products:Best_Selling_Product
  async ngOnInit(): Promise<void> {
    this.isLoading=true
     this.products= (await this.productService.getBestSellingProduct()).bestSellingProduct   
     debugger  
     this.isLoading=false
    if (!this.isLoading) {
    this.createDoughnutChart();
    }
  }


  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef;
  doughnutChart: any;

  ngAfterViewInit(): void {

  }

  createDoughnutChart(): void {
    const doughnutCanvas = this.doughnutCanvas.nativeElement.getContext('2d');
    const truncatedLabels = this.products.bestSellingProducts.map(product => product.name.slice(0, 10) + '...');
    const productData=this.products.bestSellingProducts.map(product=>product.quantitySold)
    this.doughnutChart = new Chart(doughnutCanvas, {
      type: 'doughnut',
      data: {
        labels:truncatedLabels,
        datasets: [{
          data: productData,
          backgroundColor: ['red', 'green', 'blue','yellow','purple']
        }]
      }
    });
  }
}
