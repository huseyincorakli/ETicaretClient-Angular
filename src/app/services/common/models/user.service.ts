import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { List_User } from 'src/app/contracts/users/list_user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastr: CustomToastrService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<User | Create_User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);
    return await firstValueFrom(observable) as Create_User;
  }

  async updatePassword(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "update-password"
    }, {
      userId: userId,
      resetToken: resetToken,
      password: password,
      passwordConfirm: passwordConfirm
    })
    const promiseData: Promise<any> = firstValueFrom(observable)
    promiseData.then(value => successCallBack()).catch(error => errorCallBack(error));
    await promiseData;
  }

  async getAllUsers(page: number = 0, size: number = 5, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void):
    Promise<{ totalUsersCount: number, users: List_User[] }> {
    const observable: Observable<{ totalUsersCount: number, users: List_User[] }> = this.httpClientService.get({
      controller: 'users',
      queryString: `page=${page}&size=${size}`
    })
    const promiseData = firstValueFrom(observable)
    promiseData.then(value => {
      succesCallBack()
    })
      .catch(error => errorCallBack(error))
    return await promiseData;
  }

  async assignRoleToUser(id: string, roles: string[], succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: 'users',
      action: 'assign-role-to-user'
    }, {
      userId: id,
      roles: roles
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(() => {
      succesCallBack()
    })
      .catch(error => errorCallBack(error))
    await promiseData;
  }
  async getRolesToUser(userId:string,succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void):Promise<string[]>{
    const observable: Observable<{userRoles:string[]}> = this.httpClientService.get({
      controller: 'users',
      action:'get-roles-to-user'
    },userId)
    const promiseData = firstValueFrom(observable)
    promiseData.then(value => {
      succesCallBack()
    })
      .catch(error => errorCallBack(error))
    return (await promiseData).userRoles;
  }
}
