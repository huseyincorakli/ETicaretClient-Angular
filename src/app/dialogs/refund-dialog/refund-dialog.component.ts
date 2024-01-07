import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RefundsService } from 'src/app/services/common/models/refunds.service';
import { Create_Refund } from 'src/app/contracts/refunds/create_refund';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-refund-dialog',
  templateUrl: './refund-dialog.component.html',
  styleUrls: ['./refund-dialog.component.scss']
})
export class RefundDialogComponent extends BaseDialog<RefundDialogComponent> implements OnInit {
  
  constructor( dialogRef: MatDialogRef<RefundDialogComponent>,
    private refundService:RefundsService,
    private toastr:CustomToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super(dialogRef);
    
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

async  createRefundRequest(txtName:HTMLInputElement,txtEmail:HTMLInputElement,txtOrderCode:HTMLInputElement,txtReason:HTMLTextAreaElement){
  const refund = new Create_Refund();
  refund.email=txtEmail.value;
  refund.name=txtName.value;
  refund.orderCode=txtOrderCode.value;
  refund.reason=txtReason.value;

  await this.refundService.createRefund(refund,()=>{
    this.toastr.message("Talebiniz Alındı","İade talebiniz alındı en kısa sürede geri dönüş yapılacaktır."
    ,ToastrMessageType.Success,ToastrPosition.BottomRight);
  },(err)=>{
   
  })
  }
}
