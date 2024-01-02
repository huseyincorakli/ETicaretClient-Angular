import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Low_Stock_Product } from 'src/app/contracts/products/low_stock_product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-least-stocked-products',
  templateUrl: './least-stocked-products.component.html',
  styleUrls: ['./least-stocked-products.component.scss']
})
export class LeastStockedProductsComponent implements AfterViewInit, OnInit {
  isLoading: boolean = false;
  products: Low_Stock_Product
  leastStockedProducts: any = null;
  productSize:number=5;
  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef) {

  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.products = (await this.productService.getLowStockProducts()).lowStockProducts
    this.isLoading = false
    if (!this.isLoading) {
      this.createBarChart();

    }
  }

  async createPdf(txtProductSize:HTMLInputElement){
    const size = parseInt(txtProductSize.value);
    if (size > 0) {
      this.leastStockedProducts = (await this.productService.getProductStockBySize(size)).productStocks;
    } else {
      this.leastStockedProducts = (await this.productService.getProductStockBySize(this.productSize)).productStocks;
    }
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    await this.waitForDataLoad();
    this.cdr.detectChanges()
    const pdf = new jsPDF();
    pdf.text(`${formattedDate} Stok Raporu`, 20, 10);
    autoTable(pdf, { html: '#stockTable' });
    pdf.save(`${formattedDate} Stok Raporu.pdf`);
  }
  private async waitForDataLoad(): Promise<void> {
    return new Promise((resolve) => {
      const checkData = () => {
        if (this.leastStockedProducts) {
          resolve();
        } else {
          setTimeout(checkData, 100);
        }
      };
      checkData();
    });
  }

  @ViewChild('barCanvas') barCanvas!: ElementRef;
  barChart: any;

  ngAfterViewInit(): void {
  }
  createBarChart(): void {
    Chart.defaults.elements.bar.borderWidth = 2
    const barCanvas = this.barCanvas.nativeElement.getContext('2d');
    this.barChart = new Chart(barCanvas, {
      type: 'bar',

      data: {
        labels: this.products.lowStockProducts.map(product => product.name.slice(0, 10) + '...'),
        datasets: [{
          barThickness: 15,
          minBarLength: 10, animation: {
            easing: 'easeInQuart'
          },
          label: 'Stok',
          data: this.products.lowStockProducts.map(product => product.stock),
          backgroundColor: ['red', 'green', 'blue', 'yellow', 'purple']
        }]
      },
    });
  }
}
