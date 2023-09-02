import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List_Product } from 'src/app/contracts/list_product';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  products: List_Product[];

  currentPageNo: number;
  totalProductCount:number;
  totalPageCount:number;
  pageSize:number=12;

  pageList:number[]=[];

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
     
      if (parseInt(params["pageNo"])<=0) {
        this.currentPageNo=1
      }
      else{
        this.currentPageNo=parseInt(params["pageNo"])
      }
      debugger;
      const data: { totalProductCount: number, products: List_Product[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize, () => {

      }, errorMessage => {

      })
      this.products = data.products;
      this.totalProductCount=data.totalProductCount;
      this.totalPageCount=Math.ceil(this.totalProductCount/this.pageSize);

      this.pageList=[];

      if(this.currentPageNo-3<=0){
        for (let i = 0; i <=7; i++) {
          this.pageList.push(i);
        }
      }
      else if(this.currentPageNo+3>=this.totalPageCount){
        for (let i = this.totalPageCount-6; i <= this.totalPageCount; i++) {
          this.pageList.push(i);
        }
      }
      else{
        for (let i = this.currentPageNo-3; i <=this.currentPageNo+3; i++) {
          this.pageList.push(i);
        }
      }
    }); 

  }
}
