import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import {firstValueFrom} from 'rxjs'
import { Create_Campaign } from 'src/app/contracts/campaign/create_campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private httpClientService: HttpClientService) { }

  async getAllCampaigns(size?:number,campaignCode?:string,errorCallBack?:(err:string)=>void):Promise<any>{
   let _queryString;
    if (size) {
    _queryString:`Size=${size}`
   }
   if (campaignCode) {
    _queryString+=`&CampaignCode=${campaignCode}`
   }
    const observable=  this.httpClientService.get({
      action:'GetAllCampaign',
      controller:'Campaigns',
      queryString:_queryString?_queryString:''
    })
    const promiseData= firstValueFrom(observable);
    promiseData.then(()=>{}).catch((err)=>{
      if (errorCallBack) {
        errorCallBack(err)
      }
    })
    return await promiseData
  }

  async getActiveCampaign(errorCallBack?:(err:string)=>void):Promise<any> {
    const observable=  this.httpClientService.get({
      action:'GetActiveCampaign',
      controller:'Campaigns'
    })
    const promiseData = firstValueFrom(observable);
    promiseData.then(()=>{}).catch((err)=>{
      if (errorCallBack) {
        errorCallBack(err);
      }
    })
    return await promiseData
  }


  async deleteCampaing(id:string,errorCallBack?:(err)=>void,successCallback?:()=>void){
    const observable=this.httpClientService.delete({
      action:"DeleteCampaign",
      controller:'Campaigns'
    },id)

    const promiseData= firstValueFrom(observable);
    promiseData.then(()=>{
      if (successCallback) {
        successCallback();
      }
    }).catch((err)=>{
      if (errorCallBack) {
        errorCallBack(err)
      }
    })
    await promiseData;
  }

  async updateCampaignShowcase(id:string, status:boolean,errorCallBack?:(err)=> void, successCallback?:()=>void){
    const observable= this.httpClientService.put({
      action:'UpdateCampaingShowcase',
      controller:'Campaigns'
    },{"showcaseId":id,"showValue":status})

    const promiseData= firstValueFrom(observable);
    promiseData.then(()=>{
      if (successCallback) {
        successCallback();
      }
    }).catch((err)=>{
      if (errorCallBack) {
        errorCallBack(err)
      }
    })
    await promiseData;
  }

  async createCampaign(createCampaign:Create_Campaign,errorCallBack?:(err)=>void,successCallback?:()=>void){
    const observable = this.httpClientService.post({
      action:'CreateCampaign',
      controller:'Campaigns'
    },{"createCampaign":createCampaign})

    const promiseData= firstValueFrom(observable);
    promiseData.then(()=>{
      if (successCallback) {
        successCallback();
      }
    }).catch((err)=>{
      if (errorCallBack) {
        errorCallBack(err)
      }
    })
    await promiseData;
  }
  
}
