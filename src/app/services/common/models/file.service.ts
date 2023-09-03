import { Injectable } from '@angular/core';
import {Observable,firstValueFrom} from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { BaseUrl } from 'src/app/contracts/base_url';


@Injectable({
  providedIn: 'root'
})
export class FileService {
    constructor(private httpClientService:HttpClientService){}

   async getBaseStorageUrl( ){
        const getObservable:Observable<BaseUrl> = this.httpClientService.get<BaseUrl>({
            controller:"files",
            action:'GetBaseStorageUrl'
        })

       return await firstValueFrom(getObservable)
    }
}