import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileService } from 'src/app/services/common/models/file.service';
import { BaseUrl } from 'src/app/contracts/base_url';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { HomeSettingService } from 'src/app/services/common/models/home-setting.service';
import { Get_Home_Setting } from 'src/app/contracts/home-settings/get-home-settings';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import {  NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent extends BaseComponent implements OnInit {
  selectedFile: File | null = null;
  baseUrl: string;
  percentDoneNum:number=0;
  isLoading:boolean=false;
  homeSetting:Get_Home_Setting;
  constructor(
    spinner:NgxSpinnerService,
    private httpClient: HttpClient,
    private fileService: FileService,
    private toastr:CustomToastrService,
    private homeSettingService:HomeSettingService) { 

      super(spinner)
    }
  async ngOnInit(){
    this.showSpinner(SpinnerType.Classic)
    this.baseUrl = (await this.fileService.getBaseStorageUrl()).url
    this.homeSetting=  await this.homeSettingService.getSetting();
    this.hideSpinner(SpinnerType.Classic)
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }



  uploadVideo() {
    this.isLoading = true;
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('files', this.selectedFile, this.selectedFile.name);

      const apiUrl = `${this.baseUrl}api/HomeSettings/HomeSettingsVideoUpload`;

      this.httpClient.post(apiUrl, formData, { reportProgress: true, observe: 'events' })
        .subscribe(
          (event: HttpEvent<any>) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.percentDoneNum = Math.round((100 * event.loaded) / (event.total || 0));
            } else if (event.type === HttpEventType.Response) {
              this.toastr.message('Başarılı','Video başarılı şekilde güncellendi lütfen, değişiklikleri görmek için farklı sekme kullanınız.',ToastrMessageType.Success,ToastrPosition.BottomRight)
            }
          },
          (error) => {
            console.error('Error uploading video', error);
            this.toastr.message('Hata','Video yüklenirken bir hata oluştu',ToastrMessageType.Error,ToastrPosition.BottomRight)
          },
          () => {
            this.isLoading = false; 
          }
        );
    } else {
      this.toastr.message('Dosya Seçilmedi','',ToastrMessageType.Error,ToastrPosition.BottomRight)
      this.isLoading = false; 
    }
  }

  errorMessage(){
    this.toastr.message('Hata','Güncelleme yapılırken bir hata oluştu',ToastrMessageType.Error,ToastrPosition.BottomRight)
  }
successMessage(){
  this.toastr.message('Başarılı','Güncelleme başarılı',ToastrMessageType.Success,ToastrPosition.BottomRight)
}
  async updateTitle(txtTitle:HTMLTextAreaElement){
  const value = txtTitle.value;
  await this.homeSettingService.updateTitle(value,(err)=>{
    this.errorMessage();
  },()=>{
   this.successMessage();
  })
  }
  async updateText(txtWelcomeText:HTMLTextAreaElement){
    const value = txtWelcomeText.value;
    await this.homeSettingService.updateWText(value,(err)=>{
      this.errorMessage();
    },()=>{
     this.successMessage();
    })
  }
 async updateFeaturedSize(txtFeaturedSize:HTMLInputElement){
    const value = parseInt(txtFeaturedSize.value);
    await this.homeSettingService.updateFeaturedProductSize(value,(err)=>{
      this.errorMessage();
    },()=>{
      this.successMessage();
    })
  }
}
