import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import {firstValueFrom} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private httpClientService: HttpClientService) { }

  async getAllCampaigns(errorCallBack?:(err:string)=>void):Promise<any>{
    const observable= await this.httpClientService.get({
      action:'GetAllCampaign',
      controller:'Campaigns'
    })
    const promiseData= firstValueFrom(observable);
    promiseData.then(()=>{}).catch((err)=>{
      if (errorCallBack) {
        errorCallBack(err)
      }
    })
    return await promiseData
  }
}
