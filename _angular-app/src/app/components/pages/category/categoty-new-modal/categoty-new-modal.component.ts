import { Category } from './../../../../model';
import { CategoryHttpService } from './../../../../services/http/category-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { CategoryModel } from 'src/app/models/category-model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'categoty-new-modal',
  templateUrl: './categoty-new-modal.component.html',
  styleUrls: ['./categoty-new-modal.component.css']
})
export class CategotyNewModalComponent implements OnInit {


  @ViewChild(ModalComponent) modal!: ModalComponent;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  form: FormGroup

  constructor(private categoryHttp: CategoryHttpService, private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        name: '',
        active: true
      })
   }

  ngOnInit(): void {
  }

  showModal(){
    this.modal.show();
  }

  hideModal($event: any){
    console.log($event)
  }

  submit(){
    // this.categoryHttp.create(this.category)
    // .subscribe((category) => {
    //     console.log(category);
    //     this.onSuccess.emit(category);
    //     this.modal.hide();
    //     //this.getCategories();
    //   }, error => this.OnError.emit(error));
  }
}
