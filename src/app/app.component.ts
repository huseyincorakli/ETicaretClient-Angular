import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from './base/base.component';
import { HttpClientService } from './services/common/http-client.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { DialogService } from './services/common/dialog.service';
import { CampaignDialogComponent } from './dialogs/campaign-dialog/campaign-dialog.component';
import { ClipboardService } from './services/ui/clipboard.service';
import { CampaignService } from './services/common/models/campaign.service';
import { Campaign } from './contracts/campaign/campaign';
import { ProductService } from './services/common/models/product.service';
import { CategoryEmitterService } from './services/common/emitters.service';
import { HomeSettingService } from './services/common/models/home-setting.service';
import { ContactService } from './services/common/models/contact.service';
import { Create_Message } from './contracts/contact/create-message';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showCampaignCard: boolean = true;
  showFooter:boolean=true;
  campaignCardClosed: boolean = false;
  activeCampaign: Campaign = null;
  brands:any=[]
  uniqueBrands = [];
  uniqueBrandNames = [];
  homeSetting:any;
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective
  @ViewChild('navbarSupportedContent') navbarContent: ElementRef;
  constructor(
    private contactService:ContactService,
    private clipboard: ClipboardService,
    public authService: AuthService,
    private toastr: CustomToastrService,
    private router: Router,
    private emitterService:CategoryEmitterService,
    private spinner: NgxSpinnerService,
    private dynamicLoadComponentService: DynamicLoadComponentService,
    private campaignService: CampaignService,
    private productService: ProductService,
    private homeSettignService:HomeSettingService
  ) {
    

    authService.identityCheck();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkShowCampaignCard();
        this.checkShowFooter();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.homeSetting= await this.homeSettignService.getSetting();
    await this.getActiveCampaign()
    await this.getBrands();
    
  }

  async getBrands() {
    var fetchData:any = (await this.productService.getBrands());
     this.brands= fetchData.brands;
     this.brands.forEach(brand => {
      if (!this.uniqueBrandNames.includes(brand.name)) {
        this.uniqueBrands.push(brand);
        this.uniqueBrandNames.push(brand.name);
      }
    });
  }
  
  getProductByBrand(brandName:string){
    let path:string;
    path=this.router.url

    if (path!='/products') {
      this.router.navigate(['products']).then(()=>{
        console.log('Yönlendirme tamamlandı');
        this.emitterService.sendBrandName(brandName)
      })
      
    }
    else{
      this.emitterService.sendBrandName(brandName)
    }
    
  }
  deneme(){
    this.emitterService.deneme.emit()
  }
  async getActiveCampaign() {
    const data = await this.campaignService.getActiveCampaign();
    this.activeCampaign = data.campaign
  }

  closeCampaignCard(): void {
    this.showCampaignCard = false;
    this.campaignCardClosed = true;
  }

  checkShowCampaignCard(): void {
    const currentRoute = this.router.url;
    this.showCampaignCard = !this.campaignCardClosed && !currentRoute.includes('/admin') && !currentRoute.includes('/my-orders') && !currentRoute.includes('/checkouts');
  }
  checkShowFooter(){
    const currentRoute = this.router.url;
    this.showFooter=!this.campaignCardClosed && !currentRoute.includes('/admin') && !currentRoute.includes('/my-orders') && !currentRoute.includes('/checkouts');
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
  copy(value) {
    this.clipboard.copyTextToClipboard(value)
  }

  async sendMessage(txtMail: HTMLInputElement, txtMessage: HTMLTextAreaElement, txtTitle: HTMLInputElement) {
  
    // Validate if any of the message properties is empty
    if (!txtMail.value || !txtMessage.value || !txtTitle.value) {
      this.toastr.message('Hata', 'Lütfen tüm alanları doldurun', ToastrMessageType.Error, ToastrPosition.BottomRight);
      return; // Exit the function if validation fails
    }
  
    const message: Create_Message = {
      email: txtMail.value,
      messageContent: txtMessage.value,
      messageTitle: txtTitle.value
    }
  
    await this.contactService.createMessage(message, (err) => {
      this.toastr.message('Hata', 'Mesaj gönderilirken bir hata oluştu', ToastrMessageType.Error, ToastrPosition.BottomRight)
    }, () => {
      this.toastr.message('Mesaj gönderildi', 'En kısa sürede sizinle iletişime geçilecektir.', ToastrMessageType.Success, ToastrPosition.BottomRight)
    });
  }
  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketComponent, this.dynamicLoadComponentDirective.viewContainerRef)
  }

}

