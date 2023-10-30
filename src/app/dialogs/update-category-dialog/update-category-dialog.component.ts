import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { CategoryEmitterService } from 'src/app/services/common/emitters.service';

@Component({
  selector: 'app-update-category-dialog',
  templateUrl: './update-category-dialog.component.html',
  styleUrls: ['./update-category-dialog.component.scss']
})
export class UpdateCategoryDialogComponent extends BaseDialog<UpdateCategoryDialogComponent> implements OnInit {

  constructor(
    private categoryService: CategoryService,
    dialogRef: MatDialogRef<UpdateCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertify:AlertifyService,
    private ctgEmitService:  CategoryEmitterService
  ) {
    

    super(dialogRef);

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  async updateCategory(id: string, name: HTMLInputElement, isActive: boolean) {
    console.log(id, name.value, isActive);
    await this.categoryService.updateCategory(id, name.value, isActive, () => {
      this.alertify.message("Update is success!",{
        messageType:MessageType.Success,
        position:Position.BottomRight
      })
      this.ctgEmitService.categoryStatusChanged.emit();
      this.ctgEmitService.updateCategory.emit();
    }, () => {
      this.alertify.message("Error",{
        position:Position.BottomRight,
        messageType:MessageType.Error
      })
    })
  }

}
