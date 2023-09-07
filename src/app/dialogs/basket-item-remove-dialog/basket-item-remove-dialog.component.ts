import { Component, Inject, OnDestroy } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
declare var $:any 
@Component({
  selector: 'app-basket-item-remove-dialog',
  templateUrl: './basket-item-remove-dialog.component.html',
  styleUrls: ['./basket-item-remove-dialog.component.scss']
})
export class BasketItemRemoveDialogComponent extends BaseDialog<BasketItemRemoveDialogComponent>  implements OnDestroy{
constructor(dialogref:MatDialogRef<BasketItemRemoveDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:BasketItemDeleteState){
  super(dialogref)
}
  ngOnDestroy(): void {
    $("#basketModal").modal("show")
    $(".modal-backdrop").show()
  }

}
export enum  BasketItemDeleteState{
  Yes,
  No
}