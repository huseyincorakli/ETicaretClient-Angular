import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
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
    private spinner:NgxSpinnerService,
    public dialog: MatDialog
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
    this.openDialog(async ()=>{
      this.spinner.show(SpinnerType.Classic)
      const td=HTMLTableCellElement=this.element.nativeElement
      await this.productService.delete(this.id);
      $(td.parentElement).animate({
        opacity:0,
        left:'+=50',
        height:'toogle'
      },800,()=>{
        this.callback.emit()
      })
      this.spinner.hide(SpinnerType.Classic)
    })
  }

  openDialog(callback:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width:'250px',
      data:DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result==DeleteState.Yes)
        callback()
    });
  }
}
