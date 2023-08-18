import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  constructor(
    private userService:UserService,
    spinner:NgxSpinnerService
    ) {
    super(spinner)
  }

  async login(password:string,usernameOrEmail:string){
    this.showSpinner(SpinnerType.Classic)
    await this.userService.login(usernameOrEmail,password,()=>{this.hideSpinner(SpinnerType.Classic)})
    
  }
}
