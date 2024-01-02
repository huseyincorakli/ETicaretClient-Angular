import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { Best_Selling_Product_BySize } from 'src/app/contracts/products/best_selling_product_size';
import { CampaignService } from 'src/app/services/common/models/campaign.service';
import { ClipboardService } from 'src/app/services/ui/clipboard.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent  implements OnInit {
  isLoading:boolean=false;
  showCampaignCard: boolean = true;
  campaignCardClosed: boolean = false;
  campaigns:any=[];
  constructor(private campaignService:CampaignService, private clipboard: ClipboardService) {
    
  }
  async ngOnInit(): Promise<void> {
    this.isLoading=true;
    this.campaigns= ( await this.campaignService.getAllCampaigns()).campaigns
    await this.delay(5000);
    this.isLoading=false;
  }
 
  copy(value) {
    this.clipboard.copyTextToClipboard(value)
  }
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

}
