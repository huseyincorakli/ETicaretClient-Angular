import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Get_Home_Setting } from 'src/app/contracts/home-settings/get-home-settings';

@Injectable({
  providedIn: 'root'
})
export class HomeSettingService {

  constructor(private httpClientService: HttpClientService) { }

  async getSetting(errorCallback?: (err: string) => void): Promise<Get_Home_Setting> {
    const observable: Observable<Get_Home_Setting> = this.httpClientService.get({
      action: 'GetSetting',
      controller: 'HomeSettings'
    })
    const promiseData = firstValueFrom(observable)
    promiseData.then().catch((err: HttpErrorResponse) => {
      if (errorCallback) {
        errorCallback(err.message)
      }
    })

    return await promiseData;
  }

  async updateTitle(title: string, errorCallback?: (err: string) => void, succesCallback?: () => void) {
    const observable = this.httpClientService.get({
      action: 'UpdateHomeTitle',
      controller: 'HomeSettings',
      queryString:`title=${title}`
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(()=>{
      if (succesCallback) {
        succesCallback();
      }
    }).catch((err: HttpErrorResponse) => {
      if (errorCallback) {
        errorCallback(err.message)
      }
    })

    return await promiseData;
  }

  async updateWText(text: string, errorCallback?: (err: string) => void, succesCallback?: () => void) {
    const observable = this.httpClientService.get({
      action: 'UpdateHomeText',
      controller: 'HomeSettings',
      queryString:`text=${text}`
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(()=>{
      if (succesCallback) {
        succesCallback();
      }
    }).catch((err: HttpErrorResponse) => {
      if (errorCallback) {
        errorCallback(err.message)
      }
    })

    return await promiseData;
  }

  async updateFeaturedProductSize(size: number, errorCallback?: (err: string) => void, succesCallback?: () => void) {
    const observable = this.httpClientService.get({
      action: 'UpdateFeaturedProduct',
      controller: 'HomeSettings',
      queryString:`size=${size}`
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(()=>{
      if (succesCallback) {
        succesCallback();
      }
    }).catch((err: HttpErrorResponse) => {
      if (errorCallback) {
        errorCallback(err.message)
      }
    })

    return await promiseData;
  }

  async updateContactAddress(address: string, errorCallback?: (err: string) => void, succesCallback?: () => void) {
    const observable = this.httpClientService.get({
      action: 'UpdateContactAddress',
      controller: 'HomeSettings',
      queryString:`address=${address}`
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(()=>{
      if (succesCallback) {
        succesCallback();
      }
    }).catch((err: HttpErrorResponse) => {
      if (errorCallback) {
        errorCallback(err.message)
      }
    })

    return await promiseData;
  }
  async updateContactNumber(telNumber:string, errorCallback?: (err: string) => void, succesCallback?: () => void) {
    const observable = this.httpClientService.get({
      action: 'UpdateContactNumber',
      controller: 'HomeSettings',
      queryString:`number=${telNumber}`
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(()=>{
      if (succesCallback) {
        succesCallback();
      }
    }).catch((err: HttpErrorResponse) => {
      if (errorCallback) {
        errorCallback(err.message)
      }
    })

    return await promiseData;
  }
  async updateContactMail(mail: string, errorCallback?: (err: string) => void, succesCallback?: () => void) {
    const observable = this.httpClientService.get({
      action: 'UpdateContactMail',
      controller: 'HomeSettings',
      queryString:`mail=${mail}`
    })

    const promiseData = firstValueFrom(observable)
    promiseData.then(()=>{
      if (succesCallback) {
        succesCallback();
      }
    }).catch((err: HttpErrorResponse) => {
      if (errorCallback) {
        errorCallback(err.message)
      }
    })

    return await promiseData;
  }




}
