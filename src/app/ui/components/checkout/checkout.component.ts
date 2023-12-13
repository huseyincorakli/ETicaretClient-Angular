import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stripe, StripeElements, StripeError, loadStripe } from '@stripe/stripe-js';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

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
  basketItems: List_Basket_Item[];
  stripe: Stripe | undefined;
  constructor(
    private route: ActivatedRoute,
     private router: Router,private http: HttpClient,
    private basketService: BasketService,
    private toastr: CustomToastrService
     
     ) { }
  async ngOnInit() {
    
    
    this.basketItems = await this.basketService.get()
    if (this.basketItems.length==0) {
      this.toastr.message('Sepet Boş','Sepette ürün olmadan ödeme yapılamaz.',ToastrMessageType.Error,ToastrPosition.TopRight)
      this.router.navigate(['/products'])
    }
    this.calculateTotalBasketPrice()

    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        // Parse the JSON data
        const jsonData = JSON.parse(params['data']);
        
        this.order=jsonData.order;
        this.totalAmount= jsonData.totalAmount
        
      }
    });
  
    
    this.http.post<any>('https://localhost:7229/api/PaymentIntentApi', { items: [{ id: 'test-payment',amount:(this.totalAmount).toString() }] })
      .subscribe(data => {
        this.clientSecret = data.clientSecret;
   
        
      });
     
  } 
  calculateTotalBasketPrice() {
    this.totalAmount = this.basketItems.reduce((total, item) => total + item.totalPrice, 0);
  }
}
