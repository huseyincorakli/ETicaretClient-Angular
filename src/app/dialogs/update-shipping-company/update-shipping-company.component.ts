import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GetAll_ShippingCompanies } from 'src/app/contracts/shipping/get_all_shipping';
import { ShippingService } from 'src/app/services/common/models/shipping.service';
import { Create_ShippingCompany } from 'src/app/contracts/shipping/create_shippin_company';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-update-shipping-company',
  templateUrl: './update-shipping-company.component.html',
  styleUrls: ['./update-shipping-company.component.scss']
})
export class UpdateShippingCompanyComponent extends BaseDialog<UpdateShippingCompanyComponent> {

constructor( 
  private toastr:CustomToastrService,
  dialogRef: MatDialogRef<UpdateShippingCompanyComponent>,
  private shippingService:ShippingService,
  @Inject(MAT_DIALOG_DATA) public data: GetAll_ShippingCompanies) {
  super(dialogRef);

}

  async updateCompany(txtName:HTMLInputElement,txtUrl:HTMLInputElement,id:string){
const updateCompany = new Create_ShippingCompany();
updateCompany.companyName=txtName.value;
updateCompany.companyUrl=txtUrl.value;
  await this.shippingService.updateCompany(updateCompany,id,(err)=>{
   this.toastr.message('Hata','Güncelleme yapılırken bir hata oluştu',ToastrMessageType.Error,ToastrPosition.BottomRight)
  },()=>{
    this.toastr.message('Başarılı','Güncelleme başarılı',ToastrMessageType.Success,ToastrPosition.BottomRight)

  })
}
}
