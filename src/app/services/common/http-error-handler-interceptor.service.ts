import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastr: CustomToastrService,private userAuthService: UserAuthService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err) => {
      switch (err.status) {
        case HttpStatusCode.Unauthorized:
          this.toastr.message(
            'Yetkisiz İşlem',
            'Bu işlem için yetkiniz yoktur!',
            ToastrMessageType.Warning,
            ToastrPosition.BottomFull);
            this.userAuthService.refreshTokenLogin(localStorage.getItem('refreshToken')).then(data=>{})
          break;
      
        case HttpStatusCode.NotFound:
          this.toastr.message(
            'Sayfa Bulunamadı',
            'Aradığınız sayfa bulunamadı!',
            ToastrMessageType.Error,
            ToastrPosition.BottomFull);
          break;
      
        case HttpStatusCode.InternalServerError:
          this.toastr.message(
            'Sunucu Hatası',
            'Sunucuda beklenmedik bir hata oluştu!',
            ToastrMessageType.Error,
            ToastrPosition.BottomFull);
          break;
      
        case HttpStatusCode.BadRequest:
          this.toastr.message(
            'Geçersiz İstek',
            'Gönderdiğiniz istek geçerli değil!',
            ToastrMessageType.Warning,
            ToastrPosition.BottomFull);
          break;
      
        case HttpStatusCode.Forbidden:
          this.toastr.message(
            'Erişim Engellendi',
            'Bu kaynağa erişim izniniz yok!',
            ToastrMessageType.Error,
            ToastrPosition.BottomFull);
          break;
      
        case HttpStatusCode.ServiceUnavailable:
          this.toastr.message(
            'Servis Kullanılamıyor',
            'Şu an servis kullanılamıyor, lütfen daha sonra tekrar deneyin!',
            ToastrMessageType.Warning,
            ToastrPosition.BottomFull);
          break;
      
        // Diğer durumlar için varsayılan mesaj
        default:
          this.toastr.message(
            'Hata!',
            'Beklenmeyen bir hata oluştu!',
            ToastrMessageType.Warning,
            ToastrPosition.BottomFull);
          break;
      }
      return of(err);
    }))
  }
}
