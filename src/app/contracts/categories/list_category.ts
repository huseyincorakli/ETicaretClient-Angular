import { List_Product_Tags } from "../product_tags/list_product_tag";

export class List_Category{
    totalCategoryCount:number;
    id:string;
    categoryName:string;
    isActive:string;
    createDate:Date;
    updatedDate:Date;
    productTags:List_Product_Tags[];
}