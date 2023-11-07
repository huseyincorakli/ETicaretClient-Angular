import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import {firstValueFrom} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClientService:HttpClientService) { }

  async checkAddressForUser(userId:string,succesCallBack?:()=>void,errorCallBack?:(error:any)=>void){
    const observable=  this.httpClientService.get({
      controller:"Addresses",
      action:"GetAddressByUserId",
    },userId)

    const promiseData= firstValueFrom(observable);
    promiseData.then(()=>{
      succesCallBack();
    }).catch(err=>{
      errorCallBack(err)
    })
    return await promiseData
  }
}
