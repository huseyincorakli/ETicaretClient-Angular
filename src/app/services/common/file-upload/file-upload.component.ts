import { Component, Input } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';



@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private customToastrService: CustomToastrService,
    private alertifyService: AlertifyService,
    private dialog:MatDialog,
    private dialogService:DialogService,
    private spinner:NgxSpinnerService
    ) { }

  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData()
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath)
      })
    }
   
   this.dialogService.openDialog({
    componentType:FileUploadDialogComponent,
    data:FileUploadDialogState.Yes,
    afterClosed:()=>{
      this.spinner.show(SpinnerType.Classic)
      this.httpClientService.post({
        controller: this.options.controller,
        action: this.options.action,
        queryString: this.options.queryString,
        headers: new HttpHeaders({ "responseType": "blob" })
      }, fileData).subscribe(data => {
        this.spinner.hide(SpinnerType.Classic)
        const message: string = 'dosyalar yüklendi!';
        if (this.options.isAdminPage) {
          this.alertifyService.message(message, {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.BottomRight,
          })
        }
        else {
          this.customToastrService.message(
            'Başarili',
            message,
            ToastrMessageType.Success,
            ToastrPosition.TopRight)
        }
  
      }, (errorResponse: HttpErrorResponse) => {
        const message: string = 'dosya yüklenirken hata oluştu!';
        this.spinner.hide(SpinnerType.Classic)
        if (this.options.isAdminPage) {
          this.alertifyService.message(message, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.BottomRight,
          })
        }
        else {
          this.customToastrService.message(
            'Başarisiz',
            message,
            ToastrMessageType.Error,
            ToastrPosition.TopRight)
        }
      
    })
    }
    
   })

  
}

  
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
