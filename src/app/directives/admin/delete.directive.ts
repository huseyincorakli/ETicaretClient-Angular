import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $:any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _render: Renderer2,
    private productService: ProductService,
    private spinner:NgxSpinnerService
  ) { 

    const img= _render.createElement('img');
    img.setAttribute('src','../../../../../assets/delete.png');
    img.setAttribute('style','cursor:pointer;');
    img.width=24;
    img.height=24;
    _render.appendChild(element.nativeElement,img)
  }
  @Output() callback:EventEmitter<any>= new EventEmitter();
  @Input() id:string;
  @HostListener('click')
  async onclick(){
    this.spinner.show(SpinnerType.Classic)
    const td=HTMLTableCellElement=this.element.nativeElement
    await this.productService.delete(this.id);
    $(td.parentElement).fadeOut(400,()=>{
      this.callback.emit()
    });
    this.spinner.hide(SpinnerType.Classic)
  }
}
