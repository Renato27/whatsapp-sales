import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { CategoryModel } from 'src/app/models/category-model';

@Component({
  selector: 'categoty-edit-modal',
  templateUrl: './categoty-edit-modal.component.html',
  styleUrls: ['./categoty-edit-modal.component.css']
})
export class CategotyEditModalComponent implements OnInit {

  category: CategoryModel = {
    name: '',
    active: true
  };
@Input() _categoryId!: number;

  @ViewChild(ModalComponent) modal!: ModalComponent;
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
 @Input()
  set categoryId(value: number){
    this._categoryId = value

    if(this._categoryId){
      const token = window.localStorage.getItem('token');
      this.http.get<{data: any}>(`http://127.0.0.1:8000/api/categories/${value}`, {
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
        .subscribe((response) => this.category = response.data)
    }

  }

  submit(){
    const token = window.localStorage.getItem('token');
    this.http.put(`http://127.0.0.1:8000/api/categories/${this._categoryId}`, this.category, {
      headers:{
        'Authorization': `Bearer ${token}`
      }

    }).subscribe((category) => {
        console.log(category);
        this.onSuccess.emit(category);
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
