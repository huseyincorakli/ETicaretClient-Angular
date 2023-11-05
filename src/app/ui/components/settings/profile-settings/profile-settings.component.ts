import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UpdateProfile } from 'src/app/contracts/users/update_profile';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent extends BaseComponent implements OnInit {

  constructor(private userService: UserService, 
    spinner:NgxSpinnerService,
    private toastr:CustomToastrService) {
super(spinner)
  }
  userId: string;
   updateProfile = new UpdateProfile;

  async ngOnInit() {
    this.showSpinner(SpinnerType.Classic)
    this.userId = localStorage.getItem("userId")
    const data = await this.userService.getUserById(this.userId, () => {
      this.hideSpinner(SpinnerType.Classic)
    }, () => {
      this.hideSpinner(SpinnerType.Classic)
      this.toastr.message("Error","An error occurred while fetching user information",ToastrMessageType.Error,ToastrPosition.BottomFull)
    })
    this.updateProfile.email = data.updateProfile.email;
    this.updateProfile.nameSurname=data.updateProfile.nameSurname;
    this.updateProfile.username=data.updateProfile.username;
  }

  async UpdateUser(name: HTMLInputElement, username: HTMLInputElement,
    email: HTMLInputElement, password: HTMLInputElement, passwordConfirm: HTMLInputElement) {
      this.showSpinner(SpinnerType.Classic)
    const updateProfile = new UpdateProfile;
    updateProfile.userId = this.userId;
    updateProfile.email = email.value;
    updateProfile.nameSurname = name.value;
    updateProfile.password = password.value;
    updateProfile.passwordConfirm = passwordConfirm.value;
    updateProfile.username = username.value;

    this.userService.updateProfile(updateProfile, () => {
      this.hideSpinner(SpinnerType.Classic)
      this.toastr.message("Successful","Update successful",ToastrMessageType.Success,ToastrPosition.TopRight)
    }), () => {
      this.hideSpinner(SpinnerType.Classic)
      this.toastr.message("Error","Update is not successful",ToastrMessageType.Error,ToastrPosition.BottomFull)

    }

  }

}
