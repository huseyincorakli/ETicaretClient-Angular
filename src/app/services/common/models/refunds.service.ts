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

  async getAllRefund(size:number,errorCallBack?: (errorMessage: string) => void){
    const observable = this.httpClientService.get({
      action:'GetAllRefunds',
      controller:'PaymentIntentApi',
      queryString:`size=${size}`
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

  async getPaymentsByEmail(email:string,errorCallBack?: (errorMessage: string) => void){
    const observable = this.httpClientService.get({
      action:'GetPaymentsByMail',
      controller:'PaymentIntentApi',
      queryString:`email=${email}`
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

  async AgreeRefund(paymentIntentId: string, amount: number, message: string, userId: string,orderCode:string,
    succesCallBack?: () => Promise<void>, errorCallBack?: (errorMessage: string) => void) {
    
    const observable = this.httpClientService.get({
      action: 'RefundAccept',
      controller: 'PaymentIntentApi',
      queryString: `paymentIntentId=${paymentIntentId}&amount=${amount}&message=${message}&userId=${userId}&orderCode=${orderCode}`
    });
  
    try {
      await observable.toPromise();
      if (succesCallBack) {
        await succesCallBack();
      }
      
    } catch (err) {
      if (errorCallBack) {
        errorCallBack(err.message);
      }
    }
  }

    async RejectRefund(message:string,userId:string,
      succesCallBack?: () => Promise<void>, errorCallBack?: (errorMessage: string) => void){
        const observable = this.httpClientService.get({
          action:'RefundReject',
          controller:'PaymentIntentApi',
          queryString:`message=${message}&userId=${userId}`
        })
        try {
          await observable.toPromise();
          if (succesCallBack) {
           await succesCallBack();
          }
        } catch (err) {
          if (errorCallBack) {
            errorCallBack(err.message);
          }
        };
      }

      async ChangeRefundStatus(refundId:string,value:number,
        succesCallBack?: () =>  void, errorCallBack?: (errorMessage: string) => void){
          const observable = this.httpClientService.get({
            action:'UpdateRefundStatus',
            controller:'PaymentIntentApi',
            queryString:`refundId=${refundId}&value=${value}`
          })
          try {
            await observable.toPromise();
            if (succesCallBack) {
              succesCallBack();
            }
          } catch (err) {
            if (errorCallBack) {
              errorCallBack(err.message);
            }
          }
        }
}
