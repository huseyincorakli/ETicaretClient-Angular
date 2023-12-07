import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable,firstValueFrom } from 'rxjs';
import { Create_Comment } from 'src/app/contracts/comment/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClientService: HttpClientService) { }

  async getCommentsByProductId(productId,page:number=0,size:number=5,errorCallback?:(error:string)=>void):Promise<{ totalCount: number,avarageScore:number, responseData: Comment[] }>{
    let _queryString = `ProductId=${productId}&page=${page}&size=${size}`;

    const observable: Observable<{ totalCount: number,avarageScore:number, responseData: Comment[] }> = this.httpClientService.get
      <{ totalCount: number,avarageScore:number, responseData: Comment[] }>({
        controller: 'comments',
        action:'GetCommentsByProductId',
        queryString: _queryString
      })
      const promiseData= firstValueFrom(observable)
      promiseData.then(value => {
       
      })
        .catch(error => errorCallback(error))
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
}
