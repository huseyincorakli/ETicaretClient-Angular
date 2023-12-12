import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/contracts/campaign/campaign';
import { CreateCampaignComponent } from 'src/app/dialogs/create-campaign/create-campaign.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CampaignService } from 'src/app/services/common/models/campaign.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
declare var $:any



@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {
  
  isloading:boolean;
  campaignList: Campaign[]
  activeCampaign: Campaign = null;
  size:number=3;
  campaignCode:string=""
  constructor(
    private toastr:CustomToastrService,
    private campaignService: CampaignService,
    private dialogService:DialogService) {}

  async ngOnInit(): Promise<void> {
    await this.getAllCampaign();
  }

async deleteCampaign(id:string){
  this.dialogService.openDialog({
    componentType:DeleteDialogComponent,
    data:DeleteState.Yes,
    afterClosed:async()=>{
      this.isloading=true;
      await this.campaignService.deleteCampaing(id,(err)=>{
        this.isloading=false;
        this.toastr.message("Hata",'Kampanya silinirken bir hata oluştu.',ToastrMessageType.Error,ToastrPosition.BottomRight)
      },async ()=>{
        this.isloading=false;
        await this.refreshData()
        this.toastr.message("Başarılı",'Kampanya silindi!.',ToastrMessageType.Success,ToastrPosition.BottomRight)
      })
    },
    
  })
  
}

  async changeShowcase(id:string,status:boolean){
    this.isloading=true;
  await this.campaignService.updateCampaignShowcase(id,status,(err)=>{
    this.isloading=false;
    this.toastr.message("Hata",'Gösterim durumu  güncellenirken bir hata oluştu.',ToastrMessageType.Error,ToastrPosition.BottomRight)
  },async()=>{
    this.isloading=false;
    const allCampaignData = await this.campaignService.getAllCampaigns(this.size,this.campaignCode);
    this.campaignList = allCampaignData.campaigns;

    if (this.activeCampaign) {
      const activeCampaignData = await this.campaignService.getActiveCampaign();
      this.activeCampaign = activeCampaignData.campaign;
    }
    this.toastr.message("Başarılı",'Gösterim durumu güncellendi!.',ToastrMessageType.Success,ToastrPosition.BottomRight)
  
  })
}

  async getActiveCampaign() {
    this.isloading=true;
    const data = await this.campaignService.getActiveCampaign();
    this.activeCampaign = data.campaign
    this.isloading=false;
  }

  async getAllCampaign() {
    this.isloading=true;
    const data = await this.campaignService.getAllCampaigns(this.size,this.campaignCode);
    this.campaignList = data.campaigns;
    this.isloading=false;
  }
  
  async loadMoreCampaigns() {
    this.size += 2; 
    
    try {
    this.isloading=true;
      const data = await this.campaignService.getAllCampaigns(this.size,this.campaignCode);
      this.campaignList = data.campaigns;
    this.isloading=false;
    } catch (error) {
    this.isloading=false;
      this.toastr.message("Hata", 'Veriler yüklenirken bir hata oluştu.', ToastrMessageType.Error, ToastrPosition.BottomRight);
    }
  }
  private async refreshData() {
    try {
      // Fetch all campaigns
      const allCampaignData = await this.campaignService.getAllCampaigns(this.size,this.campaignCode);
      this.campaignList = allCampaignData.campaigns;

      // Optionally, update the active campaign if it exists
      if (this.activeCampaign) {
        const activeCampaignData = await this.campaignService.getActiveCampaign();
        this.activeCampaign = activeCampaignData.campaign;
      }
    } catch (error) {
      // Handle error, e.g., show a toastr message
      this.toastr.message("Hata", 'Veriler yeniden yüklenirken bir hata oluştu.', ToastrMessageType.Error, ToastrPosition.BottomRight);
    }
  }
  
  createCampaign(){
    this.dialogService.openDialog({
      componentType:CreateCampaignComponent,
      options:{
        height:'auto',
        width:'600px'
      },afterClosed: async()=>{
        await this.refreshData();
      }
    })
    
  }
  searchCampaign(data:any){
    this.campaignCode=data.target.value;
    this.isloading=true;
    this.refreshData();
    this.isloading=false;
  }
}
