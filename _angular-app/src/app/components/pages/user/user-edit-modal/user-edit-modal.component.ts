import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/model';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserHttpService } from './../../../../services/http/user-http.service';

@Component({
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {

  User: User = {
    name: '',
    email: ''
  };

  _UserId!: number;

  @ViewChild(ModalComponent) modal!: ModalComponent;
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private UserHttp: UserHttpService) { }

  ngOnInit(): void {
  }

  @Input()
  set UserId(value: number) {
    this._UserId = value

    if (this._UserId) {
      this.UserHttp
        .get(this._UserId)
        .subscribe(User => this.User = User)
    }

  }

  submit(){
    this.UserHttp
    .update(this._UserId, this.User)
    .subscribe((User) => {
        console.log(User);
        this.onSuccess.emit(User);
        this.modal.hide();
      }, error => this.OnError.emit(error));
  }

  showModal(){
    this.modal.show();
  }

  hideModal($event: any){
    console.log($event)
  }

}
