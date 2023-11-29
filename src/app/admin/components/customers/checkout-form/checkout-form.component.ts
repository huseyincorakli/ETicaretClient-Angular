import { Component, Input } from '@angular/core';
import { Stripe, StripeElements, StripeError } from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent {
  @Input() clientSecret: string = '';
  @Input() stripePromise: Promise<Stripe> | undefined;
  stripe: Stripe | undefined;
  elements: StripeElements | undefined;

  message: string | null = null;
  isLoading: boolean = false;

  ngOnInit() {
    if (this.stripePromise) {
      this.stripePromise.then(stripe => {
        this.stripe = stripe;
        this.elements = stripe.elements();
  
        const paymentElement = this.elements.create('card');
        paymentElement.mount('#payment-element');
      });
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
        name: 'Jenny Rosen',
      },
    },
  }).then(result => {
    if (result.error) {
      const stripeError: StripeError = result.error;
      if (stripeError.payment_intent) {
        // Handle payment_intent information
        switch (stripeError.payment_intent.status) {
          case 'succeeded':
            this.message = 'Payment succeeded!';
            break;
          case 'processing':
            this.message = 'Your payment is processing.';
            break;
          case 'requires_payment_method':
            this.message = 'Your payment was not successful, please try again.';
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
      this.message = 'Payment succeeded!';
    }

    this.isLoading = false;
  });
  }
}
