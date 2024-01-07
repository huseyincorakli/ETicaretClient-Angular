import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Refund } from 'src/app/contracts/refunds/create_refund';
import {firstValueFrom} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Get_Refund } from 'src/app/contracts/refunds/get_my_refund';
@Injectable({
  providedIn: 'root'
})
export class RefundsService {

  constructor(private httpClientService: HttpClientService) { }

  async createRefund(refund:Create_Refund, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable = this.httpClientService.post({
      action:'CreateRefund',
      controller:'PaymentIntentApi'
    },refund)

    const promiseData = firstValueFrom(observable);
    promiseData.then(()=>{
      if (succesCallBack) {
        succesCallBack();
      }
    }).catch((err:HttpErrorResponse)=>{
      if (errorCallBack) {
        errorCallBack(err.message)
      }
    })

    await promiseData;
  }

  async getMyRefundRequest(email:string,size:number,errorCallBack?: (errorMessage: string) => void):Promise<Get_Refund[]>{
    const observable = this.httpClientService.get<Get_Refund[]>({
      action:'GetRefundsByEmail',
      controller:'PaymentIntentApi',
      queryString:`email=${email}&size=${size}`
    })
    const promiseData = firstValueFrom(observable);
    promiseData.then(()=>{
      
    }).catch((err:HttpErrorResponse)=>{
      if (errorCallBack) {
        errorCallBack(err.message)
      }
    })

    return  await promiseData;

  }
}
