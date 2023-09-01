import { Component, OnInit } from '@angular/core';
import { HubUrls } from 'src/app/constants/hub-url';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { SignalRService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  constructor(private signalRService:SignalRService){
    signalRService.start(HubUrls.ProductHub);
  }
  ngOnInit(): void {
    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction,message =>{
      alert(message)
    })
  }
}
