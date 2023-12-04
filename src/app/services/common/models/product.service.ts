import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { firstValueFrom,Observable } from 'rxjs';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { GenerateProductDescription } from 'src/app/contracts/products/generate_products_desciription';
import { Product_Details } from 'src/app/contracts/products/product_detail';
import { Best_Selling_Product } from 'src/app/contracts/products/best_selling_product';
import { Low_Stock_Product } from 'src/app/contracts/products/low_stock_product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }
  
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
 
  
  async read(page: number = 0, size: number = 5,productName?:string, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalProductCount: number, products: List_Product[] }> {
    let _queryString = `page=${page}&size=${size}`;

    if (productName) {
        _queryString += `&productName=${productName}`; // Ürün ismine göre filtreleme
    }
    const promiseData: Promise<{ totalProductCount: number, products: List_Product[] }> = this.httpClientService.get
      <{ totalProductCount: number, products: List_Product[] }>({
        controller: 'products',
        queryString: _queryString
      }).toPromise();
    promiseData.then(d => succesCallBack && succesCallBack())
    .catch((errorResponse: HttpErrorResponse) => errorCallBack && errorCallBack(errorResponse.message));

    return await promiseData;
  }
  async getBestSellingProduct(succesCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{bestSellingProduct:Best_Selling_Product}>{
    try {
      const promiseData = this.httpClientService.get({
        controller: 'products',
        queryString: '',
        action:'GetBestSellingProducts'
      });
  
      const result = await firstValueFrom(promiseData) as Best_Selling_Product;
  
      if (succesCallBack) {
        succesCallBack();
      }
  
      return { bestSellingProduct: result };
    } catch (e) {
      if (errorCallBack) {
        errorCallBack(e);
      }
      throw e;
    }
  }
  async getDailySales(year:number,mounth:number,day:number,errorCallBack?:(errorMessage:string)=>void):Promise<any>{
    try {
        const promiseData=this.httpClientService.get({
          controller:'products',
          action:'GetDailySale',
          queryString:`year=${year}&mounth=${mounth}&day=${day}`
        });
        const result=await firstValueFrom(promiseData)
        return result
    } catch (error) {
      if(errorCallBack){
        errorCallBack(error)
      }
      throw error;
    }
  }

  async getLowStockProducts(succesCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{lowStockProducts:Low_Stock_Product}>{
    try {
      const promiseData=this.httpClientService.get({
        controller:'products',
        queryString:'',
        action:'GetLowStockProducts'
      });

      const result = await firstValueFrom(promiseData) as Low_Stock_Product;
      if (succesCallBack) {
        succesCallBack()
      }
      return {lowStockProducts:result};
    } catch (error) {
      if (errorCallBack) {
        errorCallBack(error)
      }
      throw error;
    }
  }

  async readById(productId:string, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise< Product_Details> {
   const promiseData:Observable<Product_Details> = this.httpClientService.get({
    controller:'products'
   },productId)
    
   return await firstValueFrom(promiseData)
  }
  async readByCategory(page: number = 0, size: number = 5 ,categoryId:string,productName?:string, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalProductCount: number, products: List_Product[] }> {
    let _queryString=`CategoryId=${categoryId}&page=${page}&size=${size}`
    if (productName){
      _queryString=`CategoryId=${categoryId}&page=${page}&size=${size}&ProductName=${productName}`
    }
    const promiseData: Promise<{ totalProductCount: number, products: List_Product[] }> = this.httpClientService.get
      <{ totalProductCount: number, products: List_Product[] }>({
        controller: 'products',
        action:'GetProductsByCategory',
        queryString: _queryString
      }).toPromise();
    promiseData.then(d => succesCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  
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

  async UpdateProduct(id:string,name:string,price:number,
    stock:number,description:string,shortDesciription:string,brand:string,spesification:string[],
    succesCallBack?:()=>void,errorCallBack?:()=>void){
     const observable:Observable<any> =  this.httpClientService.put({
        controller:'products'
      },{
        id,name,price,stock,description,shortDesciription,brand,spesification
      })
      await firstValueFrom(observable).then(()=>{
        succesCallBack()
      }).catch(()=>{
        errorCallBack();
      })
  }
}

