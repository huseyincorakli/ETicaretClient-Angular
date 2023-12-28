import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable,firstValueFrom } from 'rxjs';
import { Create_Comment } from 'src/app/contracts/comment/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClientService: HttpClientService) { }

  async getCommentsByProductId(productId,page?:number,size?:number,errorCallback?:(error:string)=>void):Promise<{ totalCount: number,avarageScore:number, responseData: Comment[] }>{
    let _queryString = `ProductId=${productId}`;
    if(page && size){
      _queryString+=`&page=${page}&size=${size}`
    }
    const observable: Observable<{ totalCount: number,avarageScore:number, responseData: Comment[] }> = this.httpClientService.get
      <{ totalCount: number,avarageScore:number, responseData: Comment[] }>({
        controller: 'comments',
        action:'GetCommentsByProductId',
        queryString: _queryString
      })
      const promiseData= firstValueFrom(observable)
      promiseData.then(value => {
       
      })
        .catch(error =>{
          if(errorCallback){
            errorCallback(error)
          }
        })
      return await promiseData;
  }

  async getComment(productId:string,userId:string,errorCallback?:(error:string)=>void):Promise<any>{
    let _queryString=`UserId=${userId}&ProductId=${productId}`;
    const observable = this.httpClientService.get({
      action:'GetUserComment',
      controller:'comments',
      queryString:_queryString
    })
    const promiseData = firstValueFrom(observable)
    promiseData.then(val=>{

    }).catch(err=>{
      if (errorCallback) {
        errorCallback(err);
      }
    })
    return await promiseData;
  }
  async createComment(createComment:Create_Comment,successCallBack?:()=>void,errorCallback?:(errMessage:string)=>void){
    const observable=this.httpClientService.post({
      action:'AddComment',
      controller:'comments'
    },{createComment:createComment})
    const promiseData = firstValueFrom(observable)
    promiseData.then(value=>{
      if(successCallBack){
        successCallBack();
      }
    }).catch(e=>{
      if (errorCallback) {
        errorCallback(e)
      }
    })
  }
  async summarizeComment(productId:string,successCallBack?:()=>void,errorCallback?:(err:string)=>void):Promise<any>{
    const observable = this.httpClientService.get({
      action:'SummarizeCommentAPI',
      controller:'Comments',
      queryString:`ProductId=${productId}`
    })
    const promiseData= firstValueFrom(observable);
    promiseData.then(()=>{
      if (successCallBack) {
        successCallBack();
      }
    }).catch((error)=>{
      if (errorCallback) {
        errorCallback(error);
      }
    })

    return await promiseData;
  }
}
