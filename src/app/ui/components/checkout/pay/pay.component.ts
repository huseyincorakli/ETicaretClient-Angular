import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Stripe, StripeElements, StripeError } from '@stripe/stripe-js';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { OrderService } from 'src/app/services/common/models/order.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnDestroy  {
  @Input() clientSecret: string = '';
  @Input() stripePromise: Promise<Stripe> | undefined;
  @Input() order: Create_Order;
  stripe: Stripe | undefined;
  elements: StripeElements | undefined;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private toastr: CustomToastrService,
    private router: Router) {


  }
  ngOnDestroy(): void {
    this.order=null;
  }
  message: string | null = null;
  isLoading: boolean = false;
  userId: string;
  user: any;
  async ngOnInit() {
    this.userId = localStorage.getItem('userId')
    this.user = await this.userService.getUserById(this.userId);
    if (this.stripePromise) {
      this.stripePromise.then(stripe => {
        this.stripe = stripe;
        this.elements = stripe.elements();

        const paymentElement = this.elements.create('card');
        paymentElement.mount('#payment-element');
      });
      console.log("PAY", this.order);

    }
  }
  

  handleSubmit(event: Event) {
    event.preventDefault();

    if (!this.stripe || !this.elements) {
      return;
    }

    // Get a reference to the mounted Payment Element
    const cardElement = this.elements.getElement('card');

    if (!cardElement) {
      console.error('Card Element is not mounted.');
      return;
    }

    this.isLoading = true;

    this.stripe.confirmCardPayment(this.clientSecret, {
      payment_method: {
        card: cardElement,
        // You can add additional details as needed
        billing_details: {
          name: this.user.updateProfile.nameSurname,
          email: this.user.updateProfile.email
        },
      },
    }).then(async result => {
      if (result.error) {
        const stripeError: StripeError = result.error;
        if (stripeError.payment_intent) {
          // Handle payment_intent information
          switch (stripeError.payment_intent.status) {
            case 'succeeded':
              this.message = 'Ödeme Başarılı';
              await this.orderService.create(this.order);
              debugger;
              break;
            case 'processing':
              this.message = 'Ödemeniz işleniyor...';
              break;
            case 'requires_payment_method':
              this.message = 'Ödemeniz geçerli değildir.Lütfen tekrar deneyiniz.';
              break;
            default:
              this.message = 'Something went wrong.';
              break;
          }
        } else {
          // Handle other errors
          this.message = stripeError.message || 'An unexpected error occurred.';
        }
      } else {
        // Handle success
        this.message = 'Ödeme Başarılı';
        await this.orderService.create(this.order);
        setTimeout(() => {
          this.toastr.message(this.message, "Bizi tercih ettiğiniz için teşekkürler...", ToastrMessageType.Success, ToastrPosition.BottomFull)
          this.router.navigate(['/'])
        }, 2000);
      }

      this.isLoading = false;
    });
  }
}
