import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom } from 'rxjs';
import { Create_ShippingCompany } from 'src/app/contracts/shipping/create_shippin_company';
@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private httpClientService: HttpClientService) { }

  async getAll(errorCallback?: (err: string) => void, succesCallback?: () => void): Promise<any> {
    const observable = this.httpClientService.get({
      action: 'GetAllShippingCompanies',
      controller: 'ShippingCompany',
    })

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => {
      if (succesCallback) {
        succesCallback()
      }
    }).catch((err) => {
      if (errorCallback) {
        errorCallback(err)
      }
    })
    return await promiseData;
  }

  async createCompany(company: Create_ShippingCompany, errorCallback?: (err: string) => void, succesCallback?: () => void) {
    const observable = this.httpClientService.post({
      controller: 'ShippingCompany'
    }, { createShippingCompany: company })

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => {
      if (succesCallback) {
        succesCallback()
      }
    }).catch((err) => {
      if (errorCallback) {
        errorCallback(err)
      }
    })
  }

  async removeCompany(companyId: string, errorCallback?: (err: string) => void, succesCallback?: () => void) {
    const observable = this.httpClientService.delete({
      controller: 'ShippingCompany',
      action: 'RemoveShippingCompany',
      queryString: `CompanyId=${companyId}`
    }, '')
    const promiseData = firstValueFrom(observable);
    promiseData.then(() => {
      if (succesCallback) {
        succesCallback()
      }
    }).catch((err) => {
      if (errorCallback) {
        errorCallback(err)
      }
    })
  }

  async updateCompany(updateCompany: Create_ShippingCompany,
    compainyId: string, errorCallback?: (err: string) => void, succesCallback?: () => void) {
      const observable= this.httpClientService.put({
        controller:'ShippingCompany',
        action:'UpdateShippingCompany'
      },{"updateShippingCompany":updateCompany,"companyId":compainyId})
      const promiseData = firstValueFrom(observable);
      promiseData.then(() => {
        if (succesCallback) {
          succesCallback()
        }
      }).catch((err) => {
        if (errorCallback) {
          errorCallback(err)
        }
      })
  }
}
