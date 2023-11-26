import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent extends BaseDialog<EditProductDialogComponent> implements OnInit {
  spesification:string[]
  isLoading:boolean=false;
  constructor(
    private toastr:CustomToastrService,
    dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private productService:ProductService,
    ) {
      
      super(dialogRef)
    }
  ngOnInit(): void {
    this.spesification=this.data.specifications?.toString().replace(/,/g, ' ')
    debugger
  }
    
  async Update(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement,
    desc:HTMLTextAreaElement,shortDesc:HTMLInputElement,brand:HTMLInputElement,spesifications:HTMLInputElement){
      this.isLoading=true
      const spesificationArr=spesifications.value.split(' ');
      await this.productService.UpdateProduct(this.data.id,name.value,
        parseFloat(price.value),parseInt(stock.value),desc.value,shortDesc.value,brand.value,spesificationArr,()=>{
          this.toastr.message("Başarılı","Güncelleme başarılı!",ToastrMessageType.Success,ToastrPosition.TopRight)
          this.isLoading=false;
        },()=>{
          this.toastr.message("Başarısız","Güncelleme başarısız!",ToastrMessageType.Error,ToastrPosition.TopRight)
          this.isLoading=false;
        })

  }
}
export enum EditState {
  Yes,
  No
}