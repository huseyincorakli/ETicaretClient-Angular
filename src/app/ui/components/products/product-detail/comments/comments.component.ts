import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/common/models/comment.service';
import { SharedCommentService } from 'src/app/services/common/models/shared-comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  constructor(
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private sharedComment:SharedCommentService) {
  }
  hasComment: boolean = false;
  comments: any = []
  totalCount: number;
  averageScore: number = 0;
  page = 0;
  size = 5;
  totalPages: number;
  userComment: any;
  datax:any;
  async ngOnInit() {
    
    const productId = this.activatedRoute.snapshot.paramMap.get('productId')
    var data = await this.commentService.getCommentsByProductId(productId, this.page, this.size);
    this.comments = data.responseData
    this.totalCount = data.totalCount
    this.averageScore = data.avarageScore;
    this.totalPages = Math.ceil(this.totalCount / this.size);
    const userId = localStorage.getItem('userId');
    this.datax = await this.commentService.getComment(productId, userId);
    this.hasComment = this.datax.isHas;
    
    if (this.hasComment == true) {
      this.userComment = this.datax.comment
    }
    this.sharedComment.commentSubmitted$.subscribe(async ()=>{
      await this.fetchComments();
     this.datax = await this.commentService.getComment(productId, userId);
      this.hasComment = this.datax.isHas;
      if (this.hasComment == true) {
        this.userComment = this.datax.comment
      }
    })
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
