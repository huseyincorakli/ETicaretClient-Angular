import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateCategory } from 'src/app/contracts/categories/create_category';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Category } from 'src/app/contracts/categories/list_category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClientService: HttpClientService) { }

  create(category:CreateCategory,succesCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void){
    this.httpClientService.post({
      controller:'category',
      action:'CreateCategory'
    },category)
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
        action:'GetAllCategories',
        queryString: `page=${page}&size=${size}`
      }).toPromise();
    promiseData.then(d => succesCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }
}
