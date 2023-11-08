import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import {firstValueFrom} from 'rxjs'
import { Create_Address } from 'src/app/contracts/address-settings/create_address';
import { Update_Address } from 'src/app/contracts/address-settings/update_address';

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

  async addAddress(create_address:Create_Address,succesCallBack?:()=>void,errorCallBack?:(error:any)=>void){
    const observable=this.httpClientService.post({
      action:'CreateAddress',
      controller:'Addresses',
    },create_address)
    const promiseData= firstValueFrom(observable)
    promiseData.then(()=>{
      succesCallBack()
    }).catch((error=>{
      errorCallBack(error)
    }))
  }
  async getAddress(userId:string, succesCallBack?:()=>void,errorCallBack?:(error:any)=>void){
    const observable= this.httpClientService.get({
      action:'GetAddressByUserId',
      controller:'Addresses'
    },userId)
    const promiseData=  firstValueFrom(observable)
    promiseData.then(()=>{
      succesCallBack()
    }).catch((error=>{
      errorCallBack(error)
    }))
    return promiseData;
  }
  
  async updateAddress(updateAddress:Update_Address,succesCallBack?:()=>void,errorCallBack?:(error:any)=>void){
    const observable=this.httpClientService.put({
      action:'UpdateAddress',
      controller:'Addresses'
    },updateAddress)
    const promiseData= firstValueFrom(observable)
    promiseData.then(()=>{
      succesCallBack()
    }).catch((error=>{
      errorCallBack(error)
    }))
    return promiseData;
  }
}
