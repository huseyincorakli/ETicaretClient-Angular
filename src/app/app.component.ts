import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from './base/base.component';
import { HttpClientService } from './services/common/http-client.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { DialogService } from './services/common/dialog.service';
import { CampaignDialogComponent } from './dialogs/campaign-dialog/campaign-dialog.component';
import { ClipboardService } from './services/ui/clipboard.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showCampaignCard: boolean = true;
  campaignCardClosed: boolean = false;
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective
  @ViewChild('navbarSupportedContent') navbarContent: ElementRef;
  constructor(
    private clipboard: ClipboardService,
    public authService: AuthService,
    private toastr: CustomToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private dynamicLoadComponentService: DynamicLoadComponentService,
  ) {

    authService.identityCheck();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkShowCampaignCard();
      }
    });
  }

  ngOnInit(): void {

  }


  closeCampaignCard(): void {
    this.showCampaignCard = false;
    this.campaignCardClosed = true;
  }
  checkShowCampaignCard(): void {
    const currentRoute = this.router.url;
    this.showCampaignCard = !this.campaignCardClosed && !currentRoute.includes('/admin');
  }

  toggleNavbarContent() {
    const navbarContent = this.navbarContent.nativeElement;

    if (navbarContent.classList.contains('show')) {
      navbarContent.classList.remove('show');
    } else {
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
  copy() {
    this.clipboard.copyTextToClipboard("123")
  }
  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketComponent, this.dynamicLoadComponentDirective.viewContainerRef)
  }

}

