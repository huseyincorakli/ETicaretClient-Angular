import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { OrderService } from 'src/app/services/common/models/order.service';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-weekly-sales',
  templateUrl: './weekly-sales.component.html',
  styleUrls: ['./weekly-sales.component.scss']
})
export class WeeklySalesComponent implements OnInit,AfterViewInit   {
  isloading:boolean=true;
  dates:any =[]
  datesArr:any=[]
  lineDatas:any=[]
  datesLen:number
  constructor(private orderService:OrderService) {
    
  }
  @ViewChild('lineCanvas') lineCanvas!: ElementRef;
  lineChart: any;

  async ngOnInit(): Promise<void> {
    
    this.isloading=true
    
    this.dates= this.getPastWeekDates();
    for (let index = 0; index < this.dates.length; index++) {
      const data=  (await this.orderService.getDailySale(this.dates[index].year,this.dates[index].month,this.dates[index].day)).saleQuantity
      
      this.lineDatas.push(data)      
    }
    
    this.datesArr = this.dates.map(date => new Date(date.year, date.month - 1, date.day).toLocaleDateString());
    this.datesLen= this.datesArr.length-1;
    
    this.createLineChart();
    this.isloading=false;
  }
  ngAfterViewInit(): void {
  }

   getPastWeekDates() {
    const today = new Date();
  const pastWeekDates = [];

  for (let i = 0; i < 7; i++) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);

    const year = pastDate.getFullYear();
    const month = pastDate.getMonth() + 1; 
    const day = pastDate.getDate();

    pastWeekDates.push({ year, month, day });
  }

  return pastWeekDates;
  }
  createLineChart(): void {
    const lineCanvas = this.lineCanvas.nativeElement.getContext('2d');
    this.lineChart = new Chart(lineCanvas, {
      type: 'line',
      data: {
        labels:this.datesArr,
        datasets: [{
          pointBackgroundColor:'red',
          pointBorderWidth:8,
          label: 'Günlük Satış Miktarı',
          data: this.lineDatas,
          borderColor: 'blue',
          fill: false
        }]
      }
    });
  }

  createPDFReport(): void {
    const pdf = new jsPDF();
  
    pdf.text(`${this.datesArr[0].toString()}-${this.datesArr[this.datesLen].toString()} Satis Raporu`, 20, 10);

    autoTable(pdf,{ html: '#salesTable2' });

    pdf.save(`${this.datesArr[0].toString()}-${this.datesArr[this.datesLen].toString()} Satis Raporu.pdf`);
  }
}
