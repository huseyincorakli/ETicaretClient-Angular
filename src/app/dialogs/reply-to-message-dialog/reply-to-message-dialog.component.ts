import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactService } from 'src/app/services/common/models/contact.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-reply-to-message-dialog',
  templateUrl: './reply-to-message-dialog.component.html',
  styleUrls: ['./reply-to-message-dialog.component.scss']
})
export class ReplyToMessageDialogComponent extends BaseDialog<ReplyToMessageDialogComponent> implements OnInit {
  constructor(
    private contactService: ContactService,
    private toastr: CustomToastrService,
    dialogRef: MatDialogRef<ReplyToMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any | string,
  ) {

    super(dialogRef)
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  async sendMessage(email: string, id: string, txtTitle: HTMLInputElement, txtMessage: HTMLTextAreaElement) {
    await this.contactService.replyToUserMessage(email, txtTitle.value, txtMessage.value, () => {
      this.toastr.message('Hata', 'Mesaj gönderilirken bir hata oluştu', ToastrMessageType.Error, ToastrPosition.BottomRight)
    }, async () => {
      this.toastr.message('Mesaj Gönderildi', '', ToastrMessageType.Success, ToastrPosition.BottomRight)
      await this.contactService.deleteMessage(id);
    })
  }
}
