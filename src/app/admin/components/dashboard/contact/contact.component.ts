import { Component, OnInit } from '@angular/core';
import { Get_Message } from 'src/app/contracts/contact/get-message';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { ReplyToMessageDialogComponent } from 'src/app/dialogs/reply-to-message-dialog/reply-to-message-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ContactService } from 'src/app/services/common/models/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  isLoading:boolean=false;
  messages:Get_Message[]
  selectedMessage: Get_Message;
  size:number=3;
  constructor(
    private contactService:ContactService,
    private dialogService:DialogService){}
  
  async ngOnInit() {
    this.isLoading=true;
    await this.getMessages();
   this.selectedMessage=this.messages[0]
   this.isLoading=false;
  }

  async getMessages(){
    this.messages=await this.contactService.getAllMessage(this.size)

  }
  showMessageContent(message: any) {
    this.selectedMessage = message;
  }

 async moreMessage(){
    this.size+=1;
    this.messages=await this.contactService.getAllMessage(this.size)
  }

  replyMessage(email:string,id:string){
    this.dialogService.openDialog({
      data:{email,id},
      componentType:ReplyToMessageDialogComponent,
      options:{
        width:'350px',
        height:'320px'
      }
    })
  }
  async deleteMessage(id:string){
    await this.contactService.deleteMessage(id);
    this.selectedMessage=null;
    await this.getMessages();
  }

}
