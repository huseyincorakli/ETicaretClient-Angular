import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-best-selling-products',
  templateUrl: './best-selling-products.component.html',
  styleUrls: ['./best-selling-products.component.scss']
})
export class BestSellingProductsComponent implements AfterViewInit{
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef;
  doughnutChart: any;

  ngAfterViewInit(): void {
    this.createDoughnutChart();
  }

  createDoughnutChart(): void {
    const doughnutCanvas = this.doughnutCanvas.nativeElement.getContext('2d');
    this.doughnutChart = new Chart(doughnutCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [{
          data: [30, 50, 20],
          backgroundColor: ['red', 'green', 'blue']
        }]
      }
    });
  }
}
