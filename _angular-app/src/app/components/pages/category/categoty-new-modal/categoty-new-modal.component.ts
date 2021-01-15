import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { CategoryModel } from 'src/app/models/category-model';

@Component({
  selector: 'categoty-new-modal',
  templateUrl: './categoty-new-modal.component.html',
  styleUrls: ['./categoty-new-modal.component.css']
})
export class CategotyNewModalComponent implements OnInit {

  category: CategoryModel = {
    name: '',
    active: true
  };

  @ViewChild(ModalComponent) modal!: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  showModal(){
    this.modal.show();
  }

  hideModal($event: any){
    console.log($event)
  }

  submit(){
    const token = window.localStorage.getItem('token');
    this.http.post('http://127.0.0.1:8000/api/categories', this.category, {
      headers:{
        'Authorization': `Bearer ${token}`
      }

    }).subscribe((category) => {
        console.log(category);
        this.onSuccess.emit(category);
        this.modal.hide();
        //this.getCategories();
      }, error => this.OnError.emit(error));
  }
}
