import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent {
constructor(
  spinner:NgxSpinnerService,
  private userAuthService:UserAuthService,
  private alertify:AlertifyService
  ){
  super(spinner)
}
passwordReset(email:string){
this.showSpinner(SpinnerType.Classic)
this.userAuthService.passwordReset(email,()=>{
  this.hideSpinner(SpinnerType.Classic);
  this.alertify.message("Şifre sıfırlama bağlantısı mailinize gönderilmiştir",{
    messageType:MessageType.Message,
    position:Position.TopRight
  })
})
}
}
