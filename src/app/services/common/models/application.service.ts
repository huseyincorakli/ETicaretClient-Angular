import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import {Observable,firstValueFrom} from 'rxjs';
import { Menu } from 'src/app/contracts/application-configurations/menu';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService:HttpClientService) { }

  async getAuthorizeDefinitionEndpoints(){
    const observable:Observable<Menu[]> = this.httpClientService.get<Menu[]>({
      controller:'ApplicationServices'
    });

    return await firstValueFrom(observable);
  }
  async getAddressFromCoordinates(lat: number, lon: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=${lat}&lon=${lon}`;
    var data =  this.httpClientService.get({
      fullEndPoint:url
    });
    
    return await firstValueFrom(data)
  }
}
