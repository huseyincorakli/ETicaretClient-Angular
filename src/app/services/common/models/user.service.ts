import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { firstValueFrom,Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService,private toastr:CustomToastrService) { }

 async create(user:User):Promise<Create_User>{
  const observable: Observable<User | Create_User>= this.httpClientService.post<Create_User |User>({
      controller:"users"
    },user);
    return await firstValueFrom(observable) as Create_User;
  }

  async login(usernameOrEmail:string,password:string,callBackFunction?:()=> void):Promise<void>{
    const observable:Observable<any> = this.httpClientService.post<any|TokenResponse>({
      controller:'users',
      action:'login',
    },{usernameOrEmail,password})
    
    const tokenResponse:TokenResponse=  await firstValueFrom(observable) as TokenResponse;
    
    if (tokenResponse) {
      this.toastr.message('Başarılı',"Kullanıcı Girişi Başarılı",ToastrMessageType.Success,ToastrPosition.TopLeft)
      localStorage.setItem('accessToken',tokenResponse.token.accessToken)
    }
    callBackFunction();
  }
}
