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
  stripePromise = loadStripe("pk_test_51OHAF3FTVXhGXu7OqbO77sy4QgIiUPAyPyi8kRPNd6FHCmOrhTFvLOMbjRPBL9r64auT0mGHuSvYmPr5hthth6as00L2EId35t");

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.post<any>('https://localhost:7229/api/PaymentIntentApi', { items: [{ id: 'xl-tshirt',amount:"12300" }] })
      .subscribe(data => {
        this.clientSecret = data.clientSecret;
      });
  } 
  
 
  
  }
  

 

