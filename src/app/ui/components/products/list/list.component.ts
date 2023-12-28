import { Component, ElementRef, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { CategoryEmitterService } from 'src/app/services/common/emitters.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { CategoryService } from 'src/app/services/common/models/category.service';
import { CommentService } from 'src/app/services/common/models/comment.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { Subscription } from 'rxjs';
declare var $: any;


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit,OnDestroy  {
  private brandNameSubscription: Subscription;
  private denemeSubscription: Subscription;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    spinner: NgxSpinnerService,
    private basketService: BasketService,
    private toastr: CustomToastrService,
    private commentService: CommentService,
    private emitterService:CategoryEmitterService
  ) {
    super(spinner)
  }
  ngOnDestroy(): void {
    if (this.brandNameSubscription) {
      this.brandNameSubscription.unsubscribe();
    }

    if (this.denemeSubscription) {
      this.denemeSubscription.unsubscribe();
    }
  }
  products: List_Product[];
  categories: any = [];
  productName: string;
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  baseUrl: BaseUrl;
  pageList: number[] = [];
  selectedCategoryId: string;
  firstFilterPriceValue: number = 0;
  secondFilterPriceValue: number = 500000;
  sortAZ: boolean = false;
  sortPriceAsc: boolean = false;


  onCategorySelected(event: any): void {
    this.selectedCategoryId = event.target.value;
  }

  changeFilter(firstValue: HTMLInputElement, secondValue: HTMLInputElement) {
    this.firstFilterPriceValue = parseInt(firstValue.value);
    this.secondFilterPriceValue = parseInt(secondValue.value);
  }

  async wipeFilter() {
    this.firstFilterPriceValue = null;
    this.secondFilterPriceValue = null;
    this.selectedCategoryId = null;
    await this.filter()
  }

  async ngOnInit() {
    this.brandNameSubscription =  this.emitterService.brandName$.subscribe((brandName) => {
      this.getProductByBrand(brandName);
    });
    this.denemeSubscription =  this.emitterService.deneme.subscribe(async()=>{
      const data: { totalProductCount: number, products: List_Product[] } = await this.productService.read(
        this.currentPageNo - 1,
        this.pageSize,
        null, null, null, null, () => { }, () => { }
      );

      this.products = data.products.map(p => {
        return {
          ...p,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(img => img.showcase).path : ''
        };
      });
    })
    this.baseUrl = await this.fileService.getBaseStorageUrl()

    this.activatedRoute.params.subscribe(async params => {
      this.showSpinner(SpinnerType.Classic)
      this.categories = (await this.categoryService.getAllCategoryNames()).categoryNames;

      if (parseInt(params["pageNo"]) <= 0 || params["pageNo"] == undefined) {
        this.currentPageNo = 1

      }
      else {
        this.currentPageNo = parseInt(params["pageNo"])
      }

      const data: { totalProductCount: number, products: List_Product[] } =
        await this.productService.read(this.currentPageNo - 1, this.pageSize, '', null, null)

      this.products = data.products;
      if (!this.sortAZ) {
        this.alphabeticSortAZ()
      }
      else {
        this.alphabeticSortZA()
      }
      if (!this.sortPriceAsc) {
        this.sortByPriceAsc()
      }
      else {
        this.sortByPriceDesc()
      }

      this.products = this.products.map<List_Product>(p => {

        const listProduct: List_Product = {

          id: p.id,
          createDate: p.createDate,
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : '',
          categoryName: p.categoryName,
          isActive: p.isActive,
          brand: p.brand
        }
        return listProduct

      })
      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];

      if (this.currentPageNo - 3 <= 0)
        for (let i = 1; i <= 7; i++)
          this.pageList.push(i);

      else if (this.currentPageNo + 3 >= this.totalPageCount)
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);
      else
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i);
      this.hideSpinner(SpinnerType.Classic)
    });



  }

  async getProductByBrand(brandName: string) {
    const data: { totalProductCount: number, products: List_Product[] } = await this.productService.read(
      this.currentPageNo - 1,
      this.pageSize,
      brandName, null, null, null, () => { }, () => { }
    );

    this.products = data.products.map(p => {
      return {
        ...p,
        imagePath: p.productImageFiles.length ? p.productImageFiles.find(img => img.showcase).path : ''
      };
    });
  }

  alphabeticSortAZ() {
    this.sortAZ = true;
    this.products = this.products.sort((a, b) => a.name.localeCompare(b.name))
  }

  alphabeticSortZA() {
    this.sortAZ = false;
    this.products = this.products.sort((a, b) => b.name.localeCompare(a.name))
  }

  sortByPriceAsc() {
    this.sortPriceAsc = true;
    this.products = this.products.sort((a, b) => a.price - b.price);
  }

  sortByPriceDesc() {
    this.sortPriceAsc = false;
    this.products = this.products.sort((a, b) => b.price - a.price);
  }

  changePage(pageNumber: number) {
    this.currentPageNo = pageNumber;
    this.ngOnInit();
  }

  async searchProducts() {
    if (this.productName) {
      const data: { totalProductCount: number, products: List_Product[] } = await this.productService.read(
        this.currentPageNo - 1,
        this.pageSize,
        this.productName, null, null, null, () => { }, () => { }
      );

      this.products = data.products.map(p => {
        return {
          ...p,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(img => img.showcase).path : ''
        };
      });

    } else {
      this.ngOnInit();
    }
  }

  async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerType.Clock)
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.hideSpinner(SpinnerType.Clock);
    this.toastr.message('BAŞARILI', 'ÜRÜN SEPETE EKLENDİ', ToastrMessageType.Success, ToastrPosition.TopRight);
  }

  async filter() {
    this.showSpinner(SpinnerType.Classic)
    const data = await this.productService.read(this.currentPageNo - 1, this.pageSize, null, this.firstFilterPriceValue, this.secondFilterPriceValue, this.selectedCategoryId)
    this.products = data.products.map(p => {
      return {
        ...p,
        imagePath: p.productImageFiles.length ? p.productImageFiles.find(img => img.showcase).path : ''
      };
    });
    this.hideSpinner(SpinnerType.Classic)

  }
}
