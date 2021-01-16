import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { CategoryModel } from 'src/app/models/category-model';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';

@Component({
  selector: 'categoty-delete-modal',
  templateUrl: './categoty-delete-modal.component.html',
  styleUrls: ['./categoty-delete-modal.component.css']
})
export class CategotyDeleteModalComponent implements OnInit {

  category: CategoryModel = {
    name: '',
    active: true
  };

  _categoryId!: number;

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
      .subscribe(category => this.category = category)
}

  }

  destroy(){
    this.categoryHttp
    .destroy(this._categoryId)
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
