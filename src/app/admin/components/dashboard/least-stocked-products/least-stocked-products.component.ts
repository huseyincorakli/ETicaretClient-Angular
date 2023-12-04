import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Low_Stock_Product } from 'src/app/contracts/products/low_stock_product';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-least-stocked-products',
  templateUrl: './least-stocked-products.component.html',
  styleUrls: ['./least-stocked-products.component.scss']
})
export class LeastStockedProductsComponent implements AfterViewInit,OnInit {
  
  constructor(private productService:ProductService) {
    
  }
  isLoading:boolean=false;
  products:Low_Stock_Product
  async ngOnInit(): Promise<void> {
    this.isLoading=true;
     this.products= (await this.productService.getLowStockProducts()).lowStockProducts
     console.log(this.products);
     this.isLoading=false
if (!this.isLoading) {
  this.createBarChart();
  
}     
  }

  @ViewChild('barCanvas') barCanvas!: ElementRef;
  barChart: any;

  ngAfterViewInit(): void {
  }
  createBarChart(): void {
    Chart.defaults.elements.bar.borderWidth=2
    const barCanvas = this.barCanvas.nativeElement.getContext('2d');
    this.barChart = new Chart(barCanvas, {
      type: 'bar',
      
      data: {
        labels:this.products.lowStockProducts.map(product=>product.name),
        datasets: [{
          barThickness:15,
          minBarLength:10,animation:{
            easing:'easeInQuart'
          },
          label: 'Stok',
          data:this.products.lowStockProducts.map(product=>product.stock),
          backgroundColor: ['red', 'green', 'blue','yellow','purple']
        }]
      },
    });
  }
}
