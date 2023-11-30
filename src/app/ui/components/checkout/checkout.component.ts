import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stripe, StripeElements, StripeError, loadStripe } from '@stripe/stripe-js';
import { Create_Order } from 'src/app/contracts/order/create_order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'
  ],
})
export class CheckoutComponent  {
  clientSecret: string = '';
  stripePromise = loadStripe("pk_test_51OHAF3FTVXhGXu7OqbO77sy4QgIiUPAyPyi8kRPNd6FHCmOrhTFvLOMbjRPBL9r64auT0mGHuSvYmPr5hthth6as00L2EId35t");
  totalAmount:number;
  order:Create_Order;
  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient) { }
  ngOnInit() {
    

    this.route.queryParams.subscribe(params => {
      // Check if the 'data' parameter is present
      if (params['data']) {
        // Parse the JSON data
        const jsonData = JSON.parse(params['data']);
        
        // Now you can use jsonData in your component
        console.log("CO",jsonData);
        this.totalAmount=jsonData.totalAmount*100;
        this.order=jsonData.order;
      }
    });

    this.http.post<any>('https://localhost:7229/api/PaymentIntentApi', { items: [{ id: 'test-payment',amount:(this.totalAmount).toString() }] })
      .subscribe(data => {
        this.clientSecret = data.clientSecret;
      });
  } 
}
