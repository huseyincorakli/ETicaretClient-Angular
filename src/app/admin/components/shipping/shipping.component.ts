import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_ShippingCompany } from 'src/app/contracts/shipping/create_shippin_company';
import { GetAll_ShippingCompanies } from 'src/app/contracts/shipping/get_all_shipping';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { UpdateShippingCompanyComponent } from 'src/app/dialogs/update-shipping-company/update-shipping-company.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ShippingService } from 'src/app/services/common/models/shipping.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent extends BaseComponent implements OnInit {

  shippingCompanies:GetAll_ShippingCompanies[];

  constructor(
    private toastr:CustomToastrService,
    spinner:NgxSpinnerService,
    private shippingService:ShippingService,
    private dialogService:DialogService) {
    super(spinner);
  }
 async ngOnInit() {
   await this.getAllCompanies();
  }

  async getAllCompanies(){
    this.showSpinner(SpinnerType.Classic)
    this.shippingCompanies=  (await this.shippingService.getAll()).shippingCompanies;
    this.hideSpinner(SpinnerType.Classic)

  }

 async createCompany(txtCompanyName:HTMLInputElement,txtCompanyUrl:HTMLInputElement){
  this.showSpinner(SpinnerType.Classic)

  const company = new Create_ShippingCompany();

  company.companyName= txtCompanyName.value;
  company.companyUrl=txtCompanyUrl.value;

  await this.shippingService.createCompany(company,()=>{
    this.toastr.message('Hata','Ekleme işlemi yapılırken bir hata oluştu',ToastrMessageType.Error,ToastrPosition.BottomRight)
  },()=>{
    this.getAllCompanies()
    this.toastr.message('Başarılı','Ekleme işlemi başarılı',ToastrMessageType.Success,ToastrPosition.BottomRight)
    txtCompanyName.value="";
    txtCompanyUrl.value="";

  })
  this.hideSpinner(SpinnerType.Classic)

 }

 refreshDatas(){
  this.getAllCompanies()
 }

 async deleteCompany(compainyId:string){
  
 this.dialogService.openDialog({
    componentType:DeleteDialogComponent,
    data:DeleteState.Yes,
    afterClosed:async()=>{
    this.showSpinner(SpinnerType.Classic)

      await this.shippingService.removeCompany(compainyId,(err)=>{
        this.toastr.message('Hata','Silme işlemi yapılırken bir hata oluştu',ToastrMessageType.Error,ToastrPosition.BottomRight)
    
      },()=>{
        this.toastr.message('Başarılı','Silme işlemi başarılı',ToastrMessageType.Success,ToastrPosition.BottomRight)
    
        this.getAllCompanies();
      })
    this.showSpinner(SpinnerType.Classic)

    }
  })
 }

 updateCompany(compainy:GetAll_ShippingCompanies){
  this.dialogService.openDialog({
    componentType:UpdateShippingCompanyComponent,
    data:compainy,
    options:{
      width:'400px'
    }
  })
  
 }



}
// await this.shippingService.removeCompany(compainyId,(err)=>{
//   this.toastr.message('Hata','Silme işlemi yapılırken bir hata oluştu',ToastrMessageType.Error,ToastrPosition.BottomRight)

// },()=>{
//   this.toastr.message('Başarılı','Silme işlemi başarılı',ToastrMessageType.Success,ToastrPosition.BottomRight)

//   this.getAllCompanies();
// })