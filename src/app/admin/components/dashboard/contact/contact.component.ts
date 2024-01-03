import { Component, OnInit } from '@angular/core';
import { Get_Message } from 'src/app/contracts/contact/get-message';
import { ContactService } from 'src/app/services/common/models/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  messages:Get_Message[]
  selectedMessage: Get_Message;
  constructor(private contactService:ContactService){}
  
  async ngOnInit() {
   this.messages=await this.contactService.getAllMessage()
   this.selectedMessage=this.messages[0]
  }

  showMessageContent(message: any) {
    this.selectedMessage = message;
  }

}
