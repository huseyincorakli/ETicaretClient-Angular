import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/common/models/product.service';
import { GenerateProductDescription } from 'src/app/contracts/products/generate_products_desciription';
import { ClipboardService } from 'src/app/services/ui/clipboard.service';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

declare var $:any

@Component({
  selector: 'app-generate-product-desciription-dialog',
  templateUrl: './generate-product-desciription-dialog.component.html',
  styleUrls: ['./generate-product-desciription-dialog.component.scss']
})
export class GenerateProductDesciriptionDialogComponent extends BaseDialog<GenerateProductDesciriptionDialogComponent> implements OnInit {
  generatedData: any = '';
  isLoading:boolean;
  constructor(dialogRef: MatDialogRef<GenerateProductDesciriptionDialogComponent>,
    private productService: ProductService,
    private clipboard:ClipboardService,
    private alertfy:AlertifyService,
    @Inject(MAT_DIALOG_DATA) public data: GenerateProductDesciriptionDialogState | string,) {
    super(dialogRef)
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async generate(txtBrand: HTMLInputElement,
    txtCategory: HTMLInputElement,
    txtDescription: HTMLInputElement,
    txtKeywords: HTMLInputElement,
    txtProductName: HTMLInputElement) {
      this.isLoading=true;
    console.log(this.isLoading);

    const obj = new GenerateProductDescription();
    obj.brand = txtBrand.value;
    obj.category = txtCategory.value;
    obj.description = txtDescription.value;
    obj.keywords = txtKeywords.value.split(/\s+/).filter(k => k.trim() !== '');
    obj.name = txtProductName.value;
    this.isLoading=true;
    
    this.generatedData = await this.productService.GenerateProductDescription(obj, () => {

    }, () => {

      alert("Olmadı")
    })

    this.isLoading=false;
    console.log(this.isLoading);


  }
  copy(text:string){
    this.clipboard.copyTextToClipboard(text);
    this.alertfy.message("Kopyalandı",{
      messageType:MessageType.Success,
      dismissOthers:true,
      position:Position.TopRight
    })
  }
}
export enum GenerateProductDesciriptionDialogState {
  Close
}