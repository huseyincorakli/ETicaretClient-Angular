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
  products:Low_Stock_Product[]
  async ngOnInit(): Promise<void> {
     this.products= (await this.productService.getLowStockProducts()).lowStockProducts
  }

  @ViewChild('barCanvas') barCanvas!: ElementRef;
  barChart: any;

  ngAfterViewInit(): void {
    this.createBarChart();
  }
  createBarChart(): void {
    const barCanvas = this.barCanvas.nativeElement.getContext('2d');
    this.barChart = new Chart(barCanvas, {
      type: 'bar',
      
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [{
          barThickness:15,
          label: 'Bar Chart',
          data: [30, 50,40,30,52],
          backgroundColor: ['red', 'green', ]
        }]
      },
    });
  }
}
