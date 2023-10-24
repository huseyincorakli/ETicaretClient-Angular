import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/common/models/product.service';
import { GenerateProductDescription } from 'src/app/contracts/products/generate_products_desciription';

@Component({
  selector: 'app-generate-product-desciription-dialog',
  templateUrl: './generate-product-desciription-dialog.component.html',
  styleUrls: ['./generate-product-desciription-dialog.component.scss']
})
export class GenerateProductDesciriptionDialogComponent extends BaseDialog<GenerateProductDesciriptionDialogComponent> implements OnInit {
  generatedData: any = '';
  constructor(dialogRef: MatDialogRef<GenerateProductDesciriptionDialogComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: GenerateProductDesciriptionDialogState | string,) {
    super(dialogRef)
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async deneme(txtBrand: HTMLInputElement,
    txtCategory: HTMLInputElement,
    txtDescription: HTMLInputElement,
    txtKeywords: HTMLInputElement,
    txtProductName: HTMLInputElement) {
    const obj = new GenerateProductDescription();
    obj.brand = txtBrand.value;
    obj.category = txtCategory.value;
    obj.description = txtDescription.value;
    obj.keywords = txtKeywords.value.split(/\s+/).filter(k => k.trim() !== '');
    obj.name = txtProductName.value;
    this.generatedData = await this.productService.GenerateProductDescription(obj, () => {

    }, () => {
      alert("Olmadı")
    })




  }
  CopyToClipBoard() {
    const descriptionText = this.generatedData.description;
    navigator.clipboard.writeText(descriptionText).then(() => {
      alert('Metin panoya kopyalandı');
    }).catch((err) => {
      console.error('Metin panoya kopyalanamadı: ', err);
    });
  }
}
export enum GenerateProductDesciriptionDialogState {
  Close
}