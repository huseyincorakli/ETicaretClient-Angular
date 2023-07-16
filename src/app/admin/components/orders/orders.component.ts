import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService) {
    super(spinner)
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.Clock)
    setTimeout(() => {
      this.hideSpinner(SpinnerType.Clock)
    }, 5000);
  }
}
