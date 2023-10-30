import { Component, ViewChild } from '@angular/core';
import { CreateCategory } from 'src/app/contracts/categories/create_category';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  showFiller = false;
  @ViewChild(ListComponent) listComponents:ListComponent;
  createdCategory(create_category:CreateCategory){
    this.listComponents.getCategories();
  }
}
