import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Category } from 'src/app/contracts/categories/list_category';
import { UpdateCategoryDialogComponent } from 'src/app/dialogs/update-category-dialog/update-category-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CategoryEmitterService } from 'src/app/services/common/emitters.service';
import { CategoryService } from 'src/app/services/common/models/category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private categoryEmitterService: CategoryEmitterService,
    private categoryService: CategoryService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private dialogService:DialogService

  ) {
    categoryEmitterService.updateCategory.subscribe(()=>{
      this.getCategories();
    })
    super(spinner)
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'isactive', 'createDate', 'updatedDate', 'edit'];
  dataSource: MatTableDataSource<List_Category> = null;

  

  async getCategories() {
    this.showSpinner(SpinnerType.Clock)
    const allCategories: { totalCategoryCount: number, categories: List_Category[] } =
      await this.categoryService.read(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.Clock),
        errorMessage => {
          this.alertify.message(errorMessage,
            { dismissOthers: true, messageType: MessageType.Error, position: Position.TopRight })
        })


    this.dataSource = new MatTableDataSource<List_Category>(allCategories.categories)
    this.paginator.length = allCategories.totalCategoryCount
  }
  async pageChange() {
    await this.getCategories();
  }

  async ngOnInit() {
    await this.getCategories();
  }

  async changeCategoryStatus(id: string, isActive: boolean) {
    await this.categoryService.changeCategoryStatus(id, !isActive, () => {
      this.alertify.message("Update is success!", {
        position: Position.BottomRight,
        messageType: MessageType.Success
      });
      this.categoryEmitterService.categoryStatusChanged.emit()
      this.getCategories();
    }, () => {
      this.alertify.message("An error occurred while updating!", {
        position: Position.BottomRight,
        messageType: MessageType.Error
      });
    });
  }

  deneme(id:string,name:string,isActive:boolean){
    this.dialogService.openDialog({
      componentType:UpdateCategoryDialogComponent,
      data:{id,name,isActive},
      options:{
        width:"500px"
      }
    })
  }



}
