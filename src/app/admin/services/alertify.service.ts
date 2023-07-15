import { Injectable } from '@angular/core';
declare var alertify:any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() { }
  message(message:string,options:Partial<AlertifyOptions>){
    alertify.set('notifier','position',options.position );
    var msg= alertify[options.messageType](message);
    if(options.dismissOthers)
    msg.dismissOthers();
  }
}
export class AlertifyOptions{
  messageType:MessageType;
  position:Position=Position.TopCenter;
  dismissOthers:boolean=false;
}
export enum MessageType{
  Error="error",
  Success="success",
  Notify="notify",
  Warning="warning",
  Message="message"
}
export enum Position{
  TopCenter="top-center",
  TopLeft="top-left",
  TopRight="top-right",
  BottomCenter="bottom-center",
  BottomLeft="bottom-left",
  BottomRight="bottom-right"
}