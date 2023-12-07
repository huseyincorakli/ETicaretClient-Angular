import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Create_Comment } from 'src/app/contracts/comment/comment';
import { CommentService } from 'src/app/services/common/models/comment.service';
import { UserService } from 'src/app/services/common/models/user.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  
  constructor(
    private route:ActivatedRoute,
    private userService:UserService,
    private commentService:CommentService) {
    
  }
  selectedRating: number = 0;
  userId:string;
  productId:string;
  userName:string;
  ngOnInit(): void {
  this.userId= localStorage.getItem('userId');
    this.route.paramMap.subscribe(async params => {
       this.productId = params.get('productId');
        const user= await this.userService.getUserById(this.userId,()=>{},()=>{})
        this.userName=user.updateProfile.nameSurname
    });
  }
  generateStars(score: number): number[] {
    return Array.from({ length: 5 }, (_, index) => index + 1);
  }
  
  selectRating(rating: number): void {
    this.selectedRating = rating;
  }
  async submitComment(txtCommentTitle:HTMLInputElement,txtCommentContent:HTMLTextAreaElement){
    console.log('çalıştııııı');
    
   const comment=new Create_Comment();
   comment.ProductId=this.productId;
   comment.CommentContent=txtCommentContent.value;
   comment.CommentTitle=txtCommentTitle.value;
   comment.NameSurname=this.userName;
   comment.Score=this.selectedRating;
   comment.UserId=this.userId;
   
   await this.commentService.createComment(comment,()=>{
      alert('yorum yapıldı')
    },()=>{

    })
    console.log('çalıştııııı 2');
    
    
  }
}
