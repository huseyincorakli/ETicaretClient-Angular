import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
// declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService: AuthService, private toastr: CustomToastrService,private router:Router) {
    authService.identityCheck();
  }
  signOut() {
    localStorage.removeItem('accessToken')
    this.authService.identityCheck();
    this.router.navigate(['login'])
    this.toastr.message('Başarılı', 'Çıkış Yapılmıştır!', ToastrMessageType.Info, ToastrPosition.TopRight)
  }
}

