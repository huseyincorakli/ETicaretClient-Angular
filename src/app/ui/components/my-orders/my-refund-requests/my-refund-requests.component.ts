import { Component, OnInit } from '@angular/core';
import { Get_Refund } from 'src/app/contracts/refunds/get_my_refund';
import { RefundsService } from 'src/app/services/common/models/refunds.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-my-refund-requests',
  templateUrl: './my-refund-requests.component.html',
  styleUrls: ['./my-refund-requests.component.scss'],
})
export class MyRefundRequestsComponent implements OnInit {
  
  constructor(private refundService:RefundsService,private userService:UserService) {
    
  }
  showTooltip: boolean = false;
  userId:string;
  userMail:string;
  myRefunds:Get_Refund[]
  size:number=3;
  async ngOnInit() {
    this.userId=localStorage.getItem('userId')
   this.userMail= (await this.userService.getUserById(this.userId)).updateProfile.email;
    await this.getRefund(this.size);
   debugger
  }
  async getRefund(size:number){
    this.myRefunds = await this.refundService.getMyRefundRequest(this.userMail,size);
  }

  moreRefund(){
    this.size=this.size+2;
    this.getRefund(this.size)
  }
}
