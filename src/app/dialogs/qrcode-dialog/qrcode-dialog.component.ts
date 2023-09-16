import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.scss']
})
export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> implements OnInit {
  loadingState:boolean;
  constructor(
    dialogRef: MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private qrcodeService: QrCodeService,
    private domSanitizer:DomSanitizer
  ) {
    super(dialogRef)
  }

  qrCodeSafeUrl:SafeHtml
  async ngOnInit() {
    this.loadingState=true;
    const qrcodeBlob: Blob = await this.qrcodeService.generateQRCode(this.data.productId)
    const url = URL.createObjectURL(qrcodeBlob)
    this.qrCodeSafeUrl=  this.domSanitizer.bypassSecurityTrustUrl(url)
    this.loadingState=false;
  }


}
