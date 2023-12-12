import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { CampaignService } from 'src/app/services/common/models/campaign.service';
import { Create_Campaign } from 'src/app/contracts/campaign/create_campaign';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent  extends BaseDialog<CreateCampaignComponent>  {
  constructor(
    dialogref: MatDialogRef<CreateCampaignComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: CustomToastrService,
    private campaignService:CampaignService
  ) {
    super(dialogref)
  }

  async createCampaign(txtTitle:HTMLInputElement,txtCode:HTMLInputElement,txtContent:HTMLInputElement
    ,txtDiscount:HTMLInputElement,txtExpiredTime:HTMLInputElement){
    
      const createCampaign = new Create_Campaign;
      createCampaign.title= txtTitle.value;
      createCampaign.code=txtCode.value;
      createCampaign.content=txtContent.value;
      createCampaign.expiredTime = new Date(txtExpiredTime.value);
      createCampaign.discountPercentage=parseInt(txtDiscount.value)

      debugger
      await this.campaignService.createCampaign(createCampaign,(err)=>{
        this.toastr.message("Hata","Kampanya eklenirken bir hata oluştu",ToastrMessageType.Error,ToastrPosition.BottomRight);
      },()=>{
        this.toastr.message("Ekleme Başarılı","Kampanya eklendi!",ToastrMessageType.Success,ToastrPosition.BottomRight);
        txtTitle.value="";
        txtCode.value="";
        txtContent.value="";
        txtExpiredTime.value="";
        txtDiscount.value="0";
      })
  }

}
