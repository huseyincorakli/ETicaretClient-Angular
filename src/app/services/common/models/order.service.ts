import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { Observable, firstValueFrom } from 'rxjs'
import { List_Order } from 'src/app/contracts/order/list_order';
import { SingleOrder } from 'src/app/contracts/order/single_order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService: HttpClientService) { }

  async create(order: Create_Order): Promise<void> {
    const observable: Observable<Create_Order> = this.httpClientService.post({
      controller: 'orders'
    }, order)
    await firstValueFrom(observable);
  }

  async getAllOrders(page: number = 0, size: number = 5,isCompleted:boolean,orderCode?:string, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void):
    
  Promise<{ totalOrderCount: number, orders: List_Order[] }> {
      let queryStringx:string;
      if (orderCode) {
        queryStringx= `page=${page}&size=${size}&IsCompleted=${isCompleted}&OrderCode=${orderCode}`
      }
      else{
        queryStringx=`page=${page}&size=${size}&IsCompleted=${isCompleted}`
      }
    const observable: Observable<{ totalOrderCount: number, orders: List_Order[] }> = this.httpClientService.get({
      controller: 'orders',
      queryString:queryStringx
    })
    const promiseData = firstValueFrom(observable)
    promiseData.then(value => {
      succesCallBack()
    })
      .catch(error => errorCallBack(error))
    return await promiseData;
  }

  async getUnCompletedOrders(size:number,errorCallBack?:(errorMessage:string)=>void):Promise<any>{
    const observable= this.httpClientService.get({
      action:'GetUnCompletedOrders',
      controller:'orders',
      queryString:`Size=${size}`
    })
    const promiseData=firstValueFrom(observable)
    promiseData.then(value=>{
      
    }).catch(error=>errorCallBack(error))
    return await promiseData;
  }

  async getOrderById(id: string, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<SingleOrder> = this.httpClientService.get<SingleOrder>({
      controller: 'orders',
    }, id)
    
    const promiseData = firstValueFrom(observable)
    promiseData.then(value => {
      succesCallBack()
    })
      .catch(error => errorCallBack(error))
    return await promiseData;
  }

  async completeOrder(id:string) {
    const observable: Observable<any> = this.httpClientService.get({
      controller: 'orders',
      action:'complete-order'
    }, id)


    await firstValueFrom(observable);
  }
  async getDailySale(year:number,month:number,day:number,errorCallBack?:()=>void,succesCallBack?:()=>void):Promise<any>{
    const observable=this.httpClientService.get({
      action:'GetDailySale',
      controller:'orders',
      queryString:`Year=${year}&Month=${month}&Day=${day}`
    })
    const promiseData=firstValueFrom(observable)
    promiseData.then(val=>{
      if (succesCallBack) {
        succesCallBack();
      }
    }).catch(err=>{
        if (errorCallBack) {
          errorCallBack()
        }
    })
    return await promiseData;
  }
}
