import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { firstValueFrom } from 'rxjs';
import { List_Product_Image } from 'src/app/contracts/list_product_image';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }
  //CREATE PRODUCT
  create(product: Create_Product, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: 'products'
    }, product)
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

//READ PRODUCT
  async read(page: number = 0, size: number = 5, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalProductCount: number, products: List_Product[] }> {
    const promiseData: Promise<{ totalProductCount: number, products: List_Product[] }> = this.httpClientService.get
    <{ totalProductCount: number, products: List_Product[] }>({
      controller: 'products',
      queryString: `page=${page}&size=${size}`
    }).toPromise();
    promiseData.then(d => succesCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  //DELETE PRODUCT
   async delete(id:string){ 
    await this.httpClientService.delete({
      controller:'products'
    },id).toPromise();
  }

  async readImages(id:string,succesCallBack?:()=>void):Promise<List_Product_Image[]>{
    const getImages= this.httpClientService.get<List_Product_Image[]>({
      action:"getproductsimages",
      controller:"products"
    },id) 
     const images= firstValueFrom(getImages)
     succesCallBack();
    return await images;
  }

  async deleteImage(id:string,imageId:string,succesCallBack:()=>void){
    const deleteObservable= this.httpClientService.delete({
      action:"deleteproductimage",
      controller:"products",
      queryString:`imageId=${imageId}`
    },id);
    firstValueFrom(deleteObservable);
    succesCallBack();
  }
}
