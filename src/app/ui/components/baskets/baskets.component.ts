import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent, ShoppingCompleteState } from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private basketService: BasketService, private orderService: OrderService, private toastr: CustomToastrService, private dialogService: DialogService, private router: Router) {
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
    const basketItemId = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    const basketItem: Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.update(basketItem)
    this.hideSpinner(SpinnerType.Clock)
  }
  async removeBasketItem(basketItemId: string) {
    $("#basketModal").modal("hide")
    $(".modal-backdrop").hide()
    this.dialogService.openDialog({
      componentType: BasketItemRemoveDialogComponent,
      data: BasketItemDeleteState.Yes,

      afterClosed: async () => {
        this.showSpinner(SpinnerType.Clock)
        await this.basketService.remove(basketItemId)
        this.hideSpinner(SpinnerType.Clock)
        $("." + basketItemId).fadeOut(400);
        $("#basketModal").modal("show")
        $(".modal-backdrop").show()
      }

    })

  }
  async completeShopping() {
    $("#basketModal").modal("hide")
    $(".modal-backdrop").hide()
    this.dialogService.openDialog({
      componentType: ShoppingCompleteDialogComponent,
      data: ShoppingCompleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.Clock)
        const order: Create_Order = new Create_Order();
        order.address = "Kahramanmaraş/Dulkadiroğlu Bağlarbaşı Mahallesi..."
        order.description = "Ketçap mayonez olmasın :)"
        await this.orderService.create(order);
        this.hideSpinner(SpinnerType.Clock);
        this.toastr.message("Sipariş Tamamlandı", "Siparişiniz oluşturulmuştur bizi tercih ettiğiniz için cart curt.", ToastrMessageType.Success, ToastrPosition.TopRight);
       
      }
    })

  }
}
