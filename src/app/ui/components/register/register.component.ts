import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { Create_User } from 'src/app/contracts/users/create_user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: CustomToastrService,
    private router:Router,
    spinner:NgxSpinnerService
  ) { super(spinner)}

  frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ["",
        [
          Validators.required
        ]],
      passwordConfirm: ["",
        [
          Validators.required
        ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password").value;
        let passwordConfirm = group.get("passwordConfirm").value;
        return password === passwordConfirm ? null : { notSame: true };
      }
    })
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User) {

    this.submitted = true;
    if (this.frm.invalid)
      return;
    user.password=CryptoJS.SHA256(user.password).toString()
    user.passwordConfirm=CryptoJS.SHA256(user.passwordConfirm).toString();
    debugger
    this.showSpinner(SpinnerType.Classic)
    const result: Create_User = await this.userService.create(user)
    if (result.succeeded) {
      this.toastrService.message(
        'Kayıt Başarılı 👌',
        result.message,
        ToastrMessageType.Success,
        ToastrPosition.TopRight
      )
    this.hideSpinner(SpinnerType.Classic)

      this.router.navigate(['login'])
    }
    else{
      this.toastrService.message(
        'Kayıt Başarısız 👎',
        result.message,
        ToastrMessageType.Error,
        ToastrPosition.TopRight
      )
    this.hideSpinner(SpinnerType.Classic)

    }
  }
}