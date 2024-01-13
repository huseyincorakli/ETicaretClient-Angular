import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';
import { RefundsService } from 'src/app/services/common/models/refunds.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { ClipboardService } from 'src/app/services/ui/clipboard.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-payment-and-order-detail-dialog',
  templateUrl: './payment-and-order-detail-dialog.component.html',
  styleUrls: ['./payment-and-order-detail-dialog.component.scss']
})
export class PaymentAndOrderDetailDialogComponent extends BaseDialog<PaymentAndOrderDetailDialogComponent> implements OnInit {
  order: any;
  payments: any;
  totalPrice: number = 0;
  acceptMessage: string;
  rejectMessage: string;
  constructor(dialogRef: MatDialogRef<PaymentAndOrderDetailDialogComponent>,
    private orderService: OrderService,
    private refundService: RefundsService,
    private userService: UserService,
    private clipboard: ClipboardService,
    private toastr: CustomToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any | string,) {
    super(dialogRef);

  }
  async ngOnInit() {
    this.order = await this.orderService.getOrderByOrdercode(this.data.code);

    this.totalPrice = 0;
    if (this.order && this.order.basketItems.length > 0) {
      // if there are items in the order
      for (let index = 0; index < this.order.basketItems.length; index++) {
        const itemPrice = this.order.basketItems[index].price * this.order.basketItems[index].quantity;
        this.totalPrice += itemPrice;
      }
    }
    const user = await this.userService.getUserById(localStorage.getItem("userId"));
    this.payments = await this.refundService.getPaymentsByEmail(this.data.mail)
    this.acceptMessage = `Sayın ${user.updateProfile.nameSurname}, ${this.data.code} numaralı siparişinizin iade talebi incelenmiş olup talep sonucunda ... TRY iade  gerçekleştirilmiştir. 3-5 iş günü içerisinde hesabınıza yansıyacaktır.`
    this.rejectMessage = `Sayın ${user.updateProfile.nameSurname}, ${this.data.code} numaralı siparişinizin iade talebi incelenmiş olup talebiniz
    ...
    sebeblerinden dolayı reddedilmiştir.`

  }
  async rejectRefund(txtMessage: HTMLTextAreaElement) {
    await this.refundService.RejectRefund(txtMessage.value, localStorage.getItem("userId"), async () => {
      this.toastr.message("İade ret işlemi başarılı", "", ToastrMessageType.Success, ToastrPosition.BottomRight)
      await this.refundService.ChangeRefundStatus(this.data.id, 0);
    })
  }
  copyToId(id: string) {
    this.clipboard.copyTextToClipboard(id);
    this.toastr.message('Kopyalandı', '', ToastrMessageType.Info, ToastrPosition.BottomCenter)
  }

  async agreeRefund(txtIntentId: HTMLInputElement, txtAmount: HTMLInputElement, txtMessage: HTMLTextAreaElement) {

    await this.refundService.AgreeRefund(txtIntentId.value, parseFloat(txtAmount.value), txtMessage.value, localStorage.getItem("userId")
      , this.data.code, async () => {
        await this.refundService.ChangeRefundStatus(this.data.id, 1);
        this.toastr.message("İade kabul işlemi başarılı", "", ToastrMessageType.Success, ToastrPosition.BottomRight)
      }, (err: string) => {
        alert(err)
      });
  }


}
//await this.refundService.ChangeRefundStatus(this.data.id,1);
//debugger