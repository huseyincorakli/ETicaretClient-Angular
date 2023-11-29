import {  Component, ElementRef, OnInit,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  loadStripe } from '@stripe/stripe-js';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit  {
  clientSecret: string = '';
  stripePromise = loadStripe("");

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.post<any>('https://localhost:7229/api/PaymentIntentApi', { items: [{ id: 'xl-tshirt',amount:"123" }] })
      .subscribe(data => {
        this.clientSecret = data.clientSecret;
      });
  } 
  
 
  
  }
  

 

