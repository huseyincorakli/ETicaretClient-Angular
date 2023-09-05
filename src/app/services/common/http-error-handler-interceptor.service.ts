import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastr: CustomToastrService, private userAuthService: UserAuthService, private router: Router,private spinner:NgxSpinnerService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err) => {
      switch (err.status) {
        case HttpStatusCode.Unauthorized:
          const url = this.router.url;
          if (url == '/products') {
            this.toastr.message(
              'Giriş Yapınız',
              'Sepete ürün eklemek için giriş yapınız!',
              ToastrMessageType.Warning,
              ToastrPosition.TopRight);
          }
          else if(url=='/admin'){
            this.toastr.message(
              'Yetkisiz İşlem',
              'Bu işlem için yetkiniz yoktur!',
              ToastrMessageType.Warning,
              ToastrPosition.BottomFull);
          }
          else {
            
          }
         
          this.userAuthService.refreshTokenLogin(localStorage.getItem('refreshToken')).then(data => { })
          break;

        case HttpStatusCode.NotFound:
          this.toastr.message(
            'Sayfa Bulunamadı',
            'Aradığınız sayfa bulunamadı!',
            ToastrMessageType.Error,
            ToastrPosition.BottomFull);
          break;

        case HttpStatusCode.InternalServerError:
          
          if (url == '/products'){

          }
          else {
            this.toastr.message(
              'Sunucu Hatası',
              'Sunucuda beklenmedik bir hata oluştu!',
              ToastrMessageType.Error,
              ToastrPosition.BottomFull);
          }
          break;

        case HttpStatusCode.BadRequest:
          if (url == '/products'){

          }
          else {
          this.toastr.message(
            'Geçersiz İstek',
            'Gönderdiğiniz istek geçerli değil!',
            ToastrMessageType.Warning,
            ToastrPosition.BottomFull);
          }
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
      this.spinner.hide(SpinnerType.Classic)
      this.spinner.hide(SpinnerType.Clock)
      return of(err);
    }))
  }
}
