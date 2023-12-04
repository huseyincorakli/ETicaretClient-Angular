import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/common/models/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  
  constructor(private commentService:CommentService, private activatedRoute: ActivatedRoute) {
  }
  
  comments:any =[]
  totalCount:number;
  averageScore:number=0;
  page=0;
  size=5;
  totalPages: number;
 async ngOnInit() {
    const productId=this.activatedRoute.snapshot.paramMap.get('productId')
    var data = await this.commentService.getCommentsByProductId(productId,this.page,this.size);
    this.comments= data.responseData
    this.totalCount=data.totalCount
    this.averageScore=data.avarageScore;
    console.log(this.comments);
    console.log(this.totalCount);
    console.log(this.averageScore);
    this.totalPages = Math.ceil(this.totalCount / this.size);
    
    
  }
  changePage(offset: number) {
    console.log(offset);
    
    const newPage = this.page + offset;
  
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.fetchComments();
    }
  }
  generateStars(score: number): number[] {
    return Array.from({ length: score }, (_, index) => index + 1);
  }
  getPageIndexes(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index);
  }
  async fetchComments() {
    const productId = this.activatedRoute.snapshot.paramMap.get('productId');
    const data = await this.commentService.getCommentsByProductId(productId, this.page, this.size);
    this.comments = data.responseData;
    this.totalCount = data.totalCount;
    this.averageScore = data.avarageScore;

    this.totalPages = Math.ceil(this.totalCount / this.size);
  }

}
