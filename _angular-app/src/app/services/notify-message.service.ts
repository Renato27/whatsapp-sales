import { Injectable } from '@angular/core';
//@ts-ignore
import PNotify from "pnotify/dist/es/PNotify";
//@ts-ignore
import PNotifyButtons from "pnotify/dist/es/PNotifyButtons";

@Injectable({
  providedIn: 'root'
})
export class NotifyMessageService {

  constructor() { }


  success(text: string){
    this.alert(text, Types.success)
  }

  error(text: string){
    this.alert(text, Types.error)
  }

  private alert(text: string, type: Types){
   this.pnotify.alert({text, type});
  }

  private get pnotify(){
    PNotifyButtons;
    return PNotify;
  }
}

enum Types{
  success = 'success',
  error   = 'error'
}
