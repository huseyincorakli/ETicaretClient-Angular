import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HubUrls } from 'src/app/constants/hub-url';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit  {
  constructor(private signalRService: SignalRService, private alertify: AlertifyService) {
  }
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef;
  doughnutChart: any;
  @ViewChild('barCanvas') barCanvas!: ElementRef;
  barChart: any;
  ngOnInit(): void {
    // this.signalRService.on(HubUrls.ProductHub,ReceiveFunctions.ProductAddedMessageReceiveFunction,message =>{
    //  // alert(message)
    // })
    this.signalRService.on(HubUrls.OrderHub, ReceiveFunctions.OrderAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        messageType: MessageType.Notify,
        position: Position.BottomRight
      })
    })
  }
  ngAfterViewInit(): void {
    this.createDoughnutChart();
    this.createBarChart();
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
  createBarChart(): void {
    const barCanvas = this.barCanvas.nativeElement.getContext('2d');
    this.barChart = new Chart(barCanvas, {
      type: 'bar',
      
      data: {
        labels: ['Label 1', 'Label 2',],
        datasets: [{
          label: 'Bar Chart',
          data: [30, 50,],
          backgroundColor: ['red', 'green', ]
        }]
      }
    });
  }
}
