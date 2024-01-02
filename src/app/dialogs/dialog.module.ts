import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent } from './shopping-complete-dialog/shopping-complete-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CompleteOrderDialogComponent } from './complete-order-dialog/complete-order-dialog.component';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';
import { QrcodeDialogComponent } from './qrcode-dialog/qrcode-dialog.component';
import { QrcodeReadingDialogComponent } from './qrcode-reading-dialog/qrcode-reading-dialog.component';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { GenerateProductDesciriptionDialogComponent } from './generate-product-desciription-dialog/generate-product-desciription-dialog.component';
import { UpdateCategoryDialogComponent } from './update-category-dialog/update-category-dialog.component';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { RouterModule } from '@angular/router';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { UpdateShippingCompanyComponent } from './update-shipping-company/update-shipping-company.component';
import {MatSelectModule} from '@angular/material/select';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';

@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    BasketItemRemoveDialogComponent,
    ShoppingCompleteDialogComponent,
    OrderDetailDialogComponent,
    CompleteOrderDialogComponent,
    AuthorizeMenuDialogComponent,
    AuthorizeUserDialogComponent,
    QrcodeDialogComponent,
    QrcodeReadingDialogComponent,
    GenerateProductDesciriptionDialogComponent,
    UpdateCategoryDialogComponent,
    EditProductDialogComponent,
    CreateCampaignComponent,
    UpdateShippingCompanyComponent,
    PaymentDetailComponent
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatTableModule,
    MatToolbarModule,
    MatBadgeModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    NgxScannerQrcodeModule,
    RouterModule,
    MatSelectModule
    
  ]
})
export class DialogModule { }
