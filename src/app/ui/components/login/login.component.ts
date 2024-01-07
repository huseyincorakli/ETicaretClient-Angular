import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import * as CryptoJS from 'crypto-js';
declare var google:any
import { jwtDecode } from 'jwt-decode';
import {  Google_Login_User } from 'src/app/contracts/users/google_login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    spinner: NgxSpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private toast:CustomToastrService
  ) {
    super(spinner)
    
   // this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
    //   this.showSpinner(SpinnerType.Clock)
    //       await userAuthService.googleLogin(user, () => {
    //         this.authService.identityCheck();
    //         this.activatedRoute.queryParams.subscribe(params => {
    //           const returnUrl: string = params['returnUrl'];
    //           if(!returnUrl){
    //             this.router.navigate(['admin'])
                
    //           }
    //           if (returnUrl) {
    //             this.router.navigate([returnUrl])
    //           }
    //         })
    //         this.hideSpinner(SpinnerType.Clock)
    //       })
    //   }
    // )
  }
  async ngOnInit() {
    google.accounts.id.initialize({
      client_id:'208902266029-lhr178otq45us116mikv94mb4vf4f3ss.apps.googleusercontent.com',
      callback:async (resp:any)=>{
        const abc:any= resp;
       const decodedData:any= jwtDecode(abc.credential)
       const user = new Google_Login_User();
       user.idToken=(abc.credential).toString();
       user.email=decodedData.email
       await this.userAuthService.googleLogin(user, () => {
                this.authService.identityCheck();
                this.activatedRoute.queryParams.subscribe(params => {
                 const returnUrl: string = params['returnUrl'];
                 if(!returnUrl){
                    this.router.navigate(['admin'])
                    
                  }
                 if (returnUrl) {
                    this.router.navigate([returnUrl])
                  }
                 })
                 this.hideSpinner(SpinnerType.Clock)
              })

      }
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme:'filled_blue',
      size:'large',
      shape:'rectangle',
      width:350,
    })
  }



  async login(password: string, usernameOrEmail: string) {
    
    password=CryptoJS.SHA256(password).toString();
    debugger;
    this.showSpinner(SpinnerType.Classic)
   const data =  await this.userAuthService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params['returnUrl'];
        if(!returnUrl){
          this.router.navigate(['admin'])
          
        }
        if (returnUrl) {
          this.router.navigate([returnUrl])
        }
        
      })
      
    }).catch(error=>{
      this.toast.message("Hata","Hatalı giriş denemesi.Lütfen giriş bilgilerinizi kontrol ediniz.",ToastrMessageType.Error,ToastrPosition.TopRight)
    })
    this.hideSpinner(SpinnerType.Classic)

  }
  
  navigateRegister(){
    this.router.navigate(['register'])
  }
  
}

