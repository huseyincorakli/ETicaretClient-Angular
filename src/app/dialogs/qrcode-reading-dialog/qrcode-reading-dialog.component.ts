import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

declare var $:any

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.scss']
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent> implements OnInit,OnDestroy {
  loadingState:boolean;
  constructor(
    dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private toastr:CustomToastrService,
    private spinner:NgxSpinnerService
  ) {
    super(dialogRef)
  }
 

  @ViewChild("scanner",{static:true})scanner:NgxScannerQrcodeComponent;
  @ViewChild("txtStock",{static:true})txtStock:ElementRef;
 
  async ngOnInit() {
    this.scanner.start();
    
  }

  ngOnDestroy(): void {
    this.scanner.stop();
  }

  onEvent(e){
    this.spinner.show(SpinnerType.Classic)
    const data:any = (e as {data:string}).data;
    if (data!=null || data!='') {
      const jsonData= JSON.parse(data)
      const stockValue= (this.txtStock.nativeElement as HTMLInputElement).value
      this.productService.UpdateProductStockFromQr(jsonData.Id,parseInt(stockValue),()=>{
        this.spinner.hide(SpinnerType.Classic)
        $("#btnClose").click();
        this.toastr.message('Stok güncellendi',`${jsonData.Name} ürününün stok bilgisi güncellendi`,ToastrMessageType.Success,ToastrPosition.TopCenter )
      })

      this.spinner.hide(SpinnerType.Classic)
     

      
    }
  
   
   
  }


}