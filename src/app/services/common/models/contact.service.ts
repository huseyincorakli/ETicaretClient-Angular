import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Message } from 'src/app/contracts/contact/create-message';
import {firstValueFrom} from 'rxjs'
import { Get_Message } from 'src/app/contracts/contact/get-message';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClientService: HttpClientService) { }

  async createMessage(message:Create_Message,errorCallback?:(err:string)=>void,successCallback?:()=>void){
   
    const observable=this.httpClientService.post({
      action:'CreateMessage',
      controller:'Contact'
    },message)

    const promiseData = firstValueFrom(observable)
    promiseData.then(()=>{
      if (successCallback) {
        successCallback()
      }
    },(err)=>{
      if (errorCallback) {
        errorCallback(err.message)
      }
    })
  }

  async getAllMessage(errorCallback?:(err:string)=>void):Promise<Get_Message[]>{
    const observable = this.httpClientService.get<Get_Message[]>({
      action:'GetAllMessage',
      controller:'Contact'
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(()=>{
      
    },(err)=>{
      if (errorCallback) {
        errorCallback(err.message)
      }
    })
    return await promiseData;
  }

  async deleteMessage(id:string,errorCallback?:(err:string)=>void,successCallback?:()=>void){
    const observable = this.httpClientService.get({
      action:'DeleteMessage',
      controller:'Contact',
      queryString:`id=${id}`
    })
    const promiseData = firstValueFrom(observable)
    promiseData.then(()=>{
      if (successCallback) {
        successCallback()
      }
    },(err)=>{
      if (errorCallback) {
        errorCallback(err.message)
      }
    })
  }
}
