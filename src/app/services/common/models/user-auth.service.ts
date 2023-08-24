import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import {firstValueFrom,Observable} from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastr: CustomToastrService) { }


  async login(usernameOrEmail: string, password: string, callBackFunction?: () => void): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post<any | TokenResponse>({
      controller: 'Auth',
      action: 'login',
    }, { usernameOrEmail, password })

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      this.toastr.message('Başarılı', "Kullanıcı Girişi Başarılı", ToastrMessageType.Success, ToastrPosition.TopRight)
      localStorage.setItem('accessToken', tokenResponse.token.accessToken)
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken)
    }
    callBackFunction();
  }

 async googleLogin(user: SocialUser,callBackFunction?: () => void) {
    const observable:Observable<SocialUser | TokenResponse> =  this.httpClientService.post<SocialUser | TokenResponse>({
      action: 'google-login',
      controller: 'Auth'
    }, user)

   const tokenResponse:TokenResponse=  await firstValueFrom(observable) as TokenResponse;
  
   if (tokenResponse) {
    this.toastr.message('Başarılı', "Kullanıcı Girişi Başarılı", ToastrMessageType.Success, ToastrPosition.TopRight)
    localStorage.setItem('accessToken', tokenResponse.token.accessToken)
    localStorage.setItem('refreshToken', tokenResponse.token.refreshToken)
  }
  callBackFunction();
  }

  async facebookLogin (user: SocialUser,callBackFunction?: () => void){
    const observable:Observable<SocialUser | TokenResponse> =  this.httpClientService.post<SocialUser | TokenResponse>({
      action: 'facebook-login',
      controller: 'Auth'
    }, user)

   const tokenResponse:TokenResponse=  await firstValueFrom(observable) as TokenResponse;
  
   if (tokenResponse) {
    this.toastr.message('Başarılı', "Kullanıcı Girişi Başarılı", ToastrMessageType.Success, ToastrPosition.TopRight)
    localStorage.setItem('accessToken', tokenResponse.token.accessToken)
  }
  callBackFunction();
  }

  async refreshTokenLogin(refreshToken:string , callBackFunction?:()=>void){
    const observable :Observable<any| TokenResponse>= this.httpClientService.post({
      action:'refreshtokenlogin',
      controller:'auth',

    },{refreshToken:refreshToken})
    
    const tokenResponse:TokenResponse = await firstValueFrom(observable) as TokenResponse
    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken)
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken)
    }
    callBackFunction();
  }
}
