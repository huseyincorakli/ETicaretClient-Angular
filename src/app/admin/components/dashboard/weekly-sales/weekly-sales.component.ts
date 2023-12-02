import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-weekly-sales',
  templateUrl: './weekly-sales.component.html',
  styleUrls: ['./weekly-sales.component.scss']
})
export class WeeklySalesComponent implements OnInit,AfterViewInit  {
  @ViewChild('lineCanvas') lineCanvas!: ElementRef;
  lineChart: any;

  constructor(private productService: ProductService) {

  }

  ngAfterViewInit(): void {
    this.createLineChart();
  }

  async ngOnInit(): Promise<void> {
    var data = await this.productService.getDailySales(2023, 11, 3)
  }

  createLineChart(): void {
    const lineCanvas = this.lineCanvas.nativeElement.getContext('2d');
    this.lineChart = new Chart(lineCanvas, {
      type: 'line',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
          label: 'Line Chart',
          data: [30, 50, 20, 45, 60, 30, 70],
          borderColor: 'blue',
          fill: false
        }]
      }
    });
  }

}
