import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CreateCategory } from 'src/app/contracts/categories/create_category';
import { CategoryService } from 'src/app/services/common/models/category.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  constructor(private categoryService:CategoryService){

  }
 @Output() createdCategory:EventEmitter<CreateCategory> = new EventEmitter();

  selectedValue: string;

  createCategory(txtName:HTMLInputElement,selectedValue){
    const category:CreateCategory= new CreateCategory();
    category.categoryName=txtName.value;
    if (selectedValue=="true") {
      category.isActive=true;
    }
    else{
      category.isActive=false
    }
    this.categoryService.create(category,()=>{
     this.createdCategory.emit(category)
      
    })
    
  }
}
