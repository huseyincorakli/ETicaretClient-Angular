import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
  categoryNameArr:any[];
  constructor(private productService: ProductService, private spiner: NgxSpinnerService,
    private categoryService: CategoryService,
    private alertify: AlertifyService) {
    super(spiner)
  }
  selected = 'none';

  ngOnInit(): void { 
    this.getCategories()
  }
  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

// deneme(){
//   console.log(this.selected);
  
// }

  create(name: HTMLInputElement, price: HTMLInputElement, stock: HTMLInputElement, description: HTMLInputElement) {
    this.showSpinner(SpinnerType.Classic)
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.price = parseFloat(price.value);
    create_product.stock = parseInt(stock.value)
    create_product.description = description.value;

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.Classic)
      this.alertify.message('Ürün Ekleme Başarılı',
        {
          messageType: MessageType.Success,
          position: Position.TopRight
        });
      this.createdProduct.emit(create_product)
    }, errorMessage => {
      setTimeout(() => {
        this.alertify.message(errorMessage, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        })
      }, 1000);
    })
  }

  async getCategories() {
   const categories=  await this.categoryService.getAllCategoryNames();
     this.categoryNameArr= categories.categoryNames
  }
}
