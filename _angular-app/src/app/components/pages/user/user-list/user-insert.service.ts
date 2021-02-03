import { Injectable } from '@angular/core';
import { UserListComponent } from './user-list.component';
import { NotifyMessageService } from './../../../../services/notify-message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInsertService {

  //@ts-ignore
  private _userListComponent: UserListComponent;

  constructor(private notifyMessage: NotifyMessageService) {}

  set userListComponent(value: UserListComponent){
    this._userListComponent = value;
  }

  showModalInsert(){
    this._userListComponent.userNewModal.showModal();
  }

  onInsertSuccess($event: any){
    this.notifyMessage.success('Produto cadastrado com sucesso.');
    console.log($event);
    this._userListComponent.getUsers();
  }

  onInsertError($event: HttpErrorResponse){
    console.log($event);
  }
}
