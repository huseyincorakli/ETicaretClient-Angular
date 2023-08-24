import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  constructor(
    private userAuthService: UserAuthService,
    spinner: NgxSpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    super(spinner)
    
    this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.Clock)
          await userAuthService.googleLogin(user, () => {
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
        //  case'FACEBOOK':
        // await userService.facebookLogin(user, () => {
        //   this.authService.identityCheck();
        //   this.activatedRoute.queryParams.subscribe(params => {
        //     const returnUrl: string = params['returnUrl'];
        //     if(!returnUrl){
        //       this.router.navigate(['admin'])
              
        //     }
        //     if (returnUrl) {
        //       this.router.navigate([returnUrl])
        //     }
        //   })
        //   this.hideSpinner(SpinnerType.Clock)
        // })
        // break;
      }
    )
  }



  async login(password: string, usernameOrEmail: string) {
    this.showSpinner(SpinnerType.Classic)
    await this.userAuthService.login(usernameOrEmail, password, () => {
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
      this.hideSpinner(SpinnerType.Classic)
    })

  }
  navigateRegister(){
    this.router.navigate(['register'])
  }
  facebookLogin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }
}

