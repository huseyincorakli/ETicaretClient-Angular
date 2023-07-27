import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) { }

  showSpinner(spinnerType: SpinnerType) {
    this.spinner.show(spinnerType)
    //setTimeout(() => this.hideSpinner(spinnerType), 6000);
  }
  
  hideSpinner(spinnerType:SpinnerType){
    this.spinner.hide(spinnerType)
  }
}

export enum SpinnerType {
  Classic = 'classic',
  Clock = 'clock'
}