import { Component,Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-campaign-dialog',
  templateUrl: './campaign-dialog.component.html',
  styleUrls: ['./campaign-dialog.component.scss']
})
export class CampaignDialogComponent extends BaseDialog<CampaignDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<CampaignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CampaigState,) {
      
      super(dialogRef)
    }
}
export enum CampaigState {
  Yes,
  No
}