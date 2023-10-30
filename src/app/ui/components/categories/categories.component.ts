import { Component, OnInit } from '@angular/core';
import { CategoryEmitterService } from 'src/app/services/common/emitters.service';
import { CategoryService } from 'src/app/services/common/models/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent  implements OnInit {

constructor(private categoryService:CategoryService,
  private categoryEmitterService: CategoryEmitterService) {
    this.categoryEmitterService.categoryStatusChanged.subscribe(()=>{
      this.getCategories();
    })
}

async ngOnInit() {
  await this.getCategories();
}
categoryNames:string[];
 async getCategories() {
  try {
    const result = await this.categoryService.getAllCategoryNames();
    this.categoryNames = result.categoryNames;
  } catch (error) {
    
  }
}


}
