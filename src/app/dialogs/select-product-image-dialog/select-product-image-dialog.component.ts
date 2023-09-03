import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType } from 'src/app/services/admin/alertify.service';
declare var $:any;


@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinner:NgxSpinnerService,
    private dialogService:DialogService,
    private alertify:AlertifyService
  ) {
    super(dialogRef)
  }
  images: List_Product_Image[];

  
  async ngOnInit() {
    this.spinner.show(SpinnerType.Classic)
    this.images = await this.productService.readImages(this.data as string,()=>{
     
      
      this.spinner.hide(SpinnerType.Classic)
    })

  
  }
 
  deleteImage(imageId:string,event:any){
  this.dialogService.openDialog({
    componentType:DeleteDialogComponent,
    data:DeleteState.Yes,
    afterClosed:()=>{
      this.spinner.show(SpinnerType.Classic)
  this.productService.deleteImage(this.data as string,imageId,()=>{
    this.spinner.hide(SpinnerType.Classic)
   var card=$(event.srcElement).parent().parent();
   card.fadeOut(500);
   alert('Silindi!')
  })
    }
  })
  
  }

  showCase(imageId:string){
   this.spinner.show(SpinnerType.Classic)
   this.productService.changeShowcaseImage(imageId,this.data as string,()=>{
    this.spinner.hide(SpinnerType.Classic)
    this.alertify.message('Vitrin resmi güncellendi',{
      messageType:MessageType.Success
    })
   })
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png,.jpeg,.jpg,.gif",
    action: "upload",
    controller: "products",
    explanation: "Ürün resmini seçin veya sürükleyin",
    isAdminPage: true,
    queryString: `id=${this.data}`
  }

}

export enum SelectProductImageState {
  Close
}