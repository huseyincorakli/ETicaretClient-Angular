import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { BasketService } from 'src/app/services/common/models/basket.service';
declare var $:any 

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private basketService: BasketService) {
    super(spinner)
  }
  basketItems: List_Basket_Item[];
  async ngOnInit() {
    this.showSpinner(SpinnerType.Clock)
    this.basketItems = await this.basketService.get()
    this.hideSpinner(SpinnerType.Clock)
  }
 async changeQuantity(object: any) {
  this.showSpinner(SpinnerType.Clock)
    const basketItemId= object.target.attributes["id"].value;
    const quantity:number=object.target.value;
    const basketItem :Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId=basketItemId;
    basketItem.quantity= quantity;
    await this.basketService.update(basketItem)
    this.hideSpinner(SpinnerType.Clock)
  }
 async removeBasketItem(basketItemId:string){
  this.showSpinner(SpinnerType.Clock)
  await this.basketService.remove(basketItemId)
  this.hideSpinner(SpinnerType.Clock)
  $("."+basketItemId).fadeOut(400);
  }
}
