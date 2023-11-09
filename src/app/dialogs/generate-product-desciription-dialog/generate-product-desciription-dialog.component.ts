import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/common/models/product.service';
import { GenerateProductDescription } from 'src/app/contracts/products/generate_products_desciription';

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
    console.log(this.isLoading);
    
    this.generatedData = await this.productService.GenerateProductDescription(obj, () => {

    }, () => {

      alert("Olmadı")
    })

    this.isLoading=false;
    console.log(this.isLoading);


  }
  CopyToClipBoard() {
    var copyText:any = document.getElementById("copyText");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
    
  }
}
export enum GenerateProductDesciriptionDialogState {
  Close
}