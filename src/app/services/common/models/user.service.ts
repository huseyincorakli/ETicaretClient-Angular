import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { firstValueFrom,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

 async create(user:User):Promise<Create_User>{
  const observable: Observable<User | Create_User>= this.httpClientService.post<Create_User |User>({
      controller:"users"
    },user);
    return await firstValueFrom(observable) as Create_User;
  }
}
