import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState|string,) {
      
      super(dialogRef)
    }
}
export enum OrderDetailDialogState {
Close,OrderComplete
}