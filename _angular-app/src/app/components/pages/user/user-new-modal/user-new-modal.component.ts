import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserHttpService } from './../../../../services/http/user-http.service';

@Component({
  selector: 'user-new-modal',
  templateUrl: './user-new-modal.component.html',
  styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent implements OnInit {

  User: User = {
    name: '',
    email: ''
  };

  @ViewChild(ModalComponent) modal!: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private UserHttp: UserHttpService) { }

  ngOnInit(): void {
  }

  showModal(){
    this.modal.show();
  }

  hideModal($event: any){
    console.log($event)
  }

  submit(){
    this.UserHttp.create(this.User)
    .subscribe((User) => {
        console.log(User);
        this.onSuccess.emit(User);
        this.modal.hide();
        //this.getCategories();
      }, error => this.OnError.emit(error));
  }

}
