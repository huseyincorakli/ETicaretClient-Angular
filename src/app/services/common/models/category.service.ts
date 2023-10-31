import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateCategory } from 'src/app/contracts/categories/create_category';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Category } from 'src/app/contracts/categories/list_category';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClientService: HttpClientService) { }

  create(category: CreateCategory, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: 'category',
      action: 'CreateCategory'
    }, category)
      .subscribe(result => {
        succesCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message: string = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br/>`;
          });
        });
        errorCallBack(message)
      })

  }
  async read(page: number = 0, size: number = 5, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCategoryCount: number, categories: List_Category[] }> {
    const promiseData: Promise<{ totalCategoryCount: number, categories: List_Category[] }> = this.httpClientService.get
      <{ totalCategoryCount: number, categories: List_Category[] }>({
        controller: 'category',
        action: 'GetAllCategories',
        queryString: `page=${page}&size=${size}`
      }).toPromise();
    promiseData.then(d => succesCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async getAllCategoryNames(): Promise<{ categoryNames: any }> {
    try {
      const response = await this.httpClientService.get<{ categoryNames: any }>({
        controller: 'category',
        action: 'GetAllCategoryName',
      }).toPromise();
      return response;
    } catch (errorResponse: any) {
      throw new Error(errorResponse.message);
    }
  }

  async getAllCategory(): Promise<{ categoryNames: string[] }> {
    try {
      const response = await this.httpClientService.get<{ categoryNames: string[] }>({
        controller: 'category',
        action: 'GetAllCategoryName',
      }).toPromise();
      return response;
    } catch (errorResponse: any) {
      throw new Error(errorResponse.message);
    }
  }

  async changeCategoryStatus(categoryId: string, isActive: boolean
    , succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const promiseData: Promise<any> = this.httpClientService.put({
      controller: 'category',
      action: 'ChangeCategoryStatus'
    }, { categoryId, isActive }).toPromise();
    promiseData.then(x => succesCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async updateCategory(
    categoryId: string,
    categoryName: string,
    isActive: boolean,succesCallBack?: () => void,errorCallBack?: (errorMessage: string) => void) {

    const promiseData: Observable<any> = this.httpClientService.put({
      controller: 'category',
      action: 'UpdateCategory'
    }, { categoryId, categoryName, isActive })
    await firstValueFrom(promiseData).then(()=>{
      succesCallBack();
    }).catch(error=>{
      errorCallBack(error.message)
    })
  }
}
