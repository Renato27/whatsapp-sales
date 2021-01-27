import { Category } from './../../../../model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { CategoryModel } from 'src/app/models/category-model';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';

@Component({
  selector: 'categoty-edit-modal',
  templateUrl: './categoty-edit-modal.component.html',
  styleUrls: ['./categoty-edit-modal.component.css']
})
export class CategotyEditModalComponent implements OnInit {

  category: Category = {
    name: '',
    active: true
  };
@Input() _categoryId!: number;

  @ViewChild(ModalComponent) modal!: ModalComponent;
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private categoryHttp: CategoryHttpService) { }

  ngOnInit(): void {
  }
 @Input()
  set categoryId(value: number){
    this._categoryId = value

    if(this._categoryId){
      this.categoryHttp
          .get(this._categoryId)
          .subscribe(category => this.category = category, error => {
            if(error.status == 401){
              this.modal.hide();
            }
          })
    }

  }

  submit(){
    this.categoryHttp
    .update(this._categoryId, this.category)
    .subscribe((category) => {
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
