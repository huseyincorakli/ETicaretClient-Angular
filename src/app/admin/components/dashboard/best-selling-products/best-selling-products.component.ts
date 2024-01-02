import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Best_Selling_Product } from 'src/app/contracts/products/best_selling_product';
import { ProductService } from 'src/app/services/common/models/product.service';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-best-selling-products',
  templateUrl: './best-selling-products.component.html',
  styleUrls: ['./best-selling-products.component.scss']
})
export class BestSellingProductsComponent implements OnInit, AfterViewInit{
  isLoading:boolean=false;
  bestSellingReportData:any=null;
  productSize:number=5;
  
  constructor(
    private productService:ProductService,
    private cdr: ChangeDetectorRef) {
  }
  products:Best_Selling_Product
  productSellingReportData:any;
  async ngOnInit(): Promise<void> {
    
    
    this.isLoading=true
     this.products= (await this.productService.getBestSellingProduct()).bestSellingProduct   
     this.isLoading=false
    if (!this.isLoading) {
    this.createDoughnutChart();
    }
  }

  async createProductReport(txtProductSize: HTMLInputElement) {
    const size = parseInt(txtProductSize.value);
    if (size > 0) {
      this.productSellingReportData = (await this.productService.getBestSellingBySize(size)).productSellings;
    } else {
      this.productSellingReportData = (await this.productService.getBestSellingBySize(this.productSize)).productSellings;
    }
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    await this.waitForDataLoad();
    this.cdr.detectChanges()
    const pdf = new jsPDF();
    pdf.text(`${formattedDate} Satis Raporu`, 20, 10);
    autoTable(pdf, { html: '#salesTable' });
    pdf.save(`${formattedDate} Satis Raporu.pdf`);
  }
  private async waitForDataLoad(): Promise<void> {
    return new Promise((resolve) => {
      const checkData = () => {
        if (this.productSellingReportData) {
          resolve();
        } else {
          setTimeout(checkData, 100);
        }
      };
      checkData();
    });
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
