import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from './base/base.component';
import { HttpClientService } from './services/common/http-client.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { DialogService } from './services/common/dialog.service';
import { CampaignDialogComponent } from './dialogs/campaign-dialog/campaign-dialog.component';

// declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  @ViewChild(DynamicLoadComponentDirective,{static:true})
  dynamicLoadComponentDirective:DynamicLoadComponentDirective
  @ViewChild('navbarSupportedContent') navbarContent: ElementRef;
  constructor(
    public authService: AuthService, 
    private toastr: CustomToastrService, 
    private router: Router, 
    private spinner: NgxSpinnerService,
    private dynamicLoadComponentService:DynamicLoadComponentService,
    private dialogService:DialogService
    ) {

    authService.identityCheck();
  }
  modalOpened:boolean=false;
  ngOnInit(): void {
    // if(!this.modalOpened){
    //   this.dialogService.openDialog({
    //     componentType:CampaignDialogComponent
    //   })
    //   this.modalOpened=true;
    // }
  }
  
  toggleNavbarContent() {
    const navbarContent = this.navbarContent.nativeElement;
    
    if (navbarContent.classList.contains('show')) {
      // Eğer Navbar içeriği "show" durumundaysa, kapat
      navbarContent.classList.remove('show');
    } else {
      // Eğer Navbar içeriği "show" durumunda değilse, aç
      navbarContent.classList.add('show');
    }
  }
  signOut() {
    this.spinner.show(SpinnerType.Classic)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')
    this.router.navigate(['/'])
    this.toastr.message('Başarılı', 'Çıkış Yapılmıştır!', ToastrMessageType.Info, ToastrPosition.TopRight)
    setTimeout(() => {
      window.location.reload();

    }, 2)
    this.spinner.hide(SpinnerType.Classic)
    this.authService.identityCheck();
  }

  loadComponent(){
   this.dynamicLoadComponentService.loadComponent(ComponentType.BasketComponent,this.dynamicLoadComponentDirective.viewContainerRef)
  }

 
  
}

