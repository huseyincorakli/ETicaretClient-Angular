import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { firstValueFrom,Observable } from 'rxjs';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { GenerateProductDescription } from 'src/app/contracts/products/generate_products_desciription';


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
  async delete(id: string) {
    await this.httpClientService.delete({
      controller: 'products'
    }, id).toPromise();
  }

  async readImages(id: string, succesCallBack?: () => void): Promise<List_Product_Image[]> {
    const getImages = this.httpClientService.get<List_Product_Image[]>({
      action: "getproductsimages",
      controller: "products"
    }, id)
    const images = firstValueFrom(getImages)
    succesCallBack();

    return await images;


  }

  async deleteImage(id: string, imageId: string, succesCallBack: () => void) {
    const deleteObservable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller: "products",
      queryString: `imageId=${imageId}`
    }, id);
    firstValueFrom(deleteObservable);
    succesCallBack();
  }

  async changeShowcaseImage(imageId: string, productId: string, succesCallBack?: () => void) {
    const changeShowcaseImageObservable = this.httpClientService.get({
      controller: 'products',
      action: 'ChangeShowcaseImage',
      queryString: `imageId=${imageId}&productId=${productId}`
    })
    firstValueFrom(changeShowcaseImageObservable);
    succesCallBack();
  }

  async UpdateProductStockFromQr(productId: string, stock: number, succesCallBack?: () => void) {
    const observable = this.httpClientService.put({
      action: 'qrcode',
      controller: 'products',

    }, { productId, stock })

    await firstValueFrom(observable);
    succesCallBack();
  }

  async GenerateProductDescription(obj: GenerateProductDescription, succesCallBack?: () => void, errorCallBack?: () => void) {
    try {
      const generateProductDescriptionObservable:Observable<any> = this.httpClientService.post({
        controller: "products",
        action: "CreateProductDescription",
      }, obj);
  
      const response = await firstValueFrom(generateProductDescriptionObservable);

      if (succesCallBack) {
        return await response;
      }
      
    } catch (error) {
      // Hata durumunda errorCallBack'ı çağırabilirsiniz.
      console.error('Hata:', error);
  
      if (errorCallBack) {
        errorCallBack();
      }
    }
  }
}

