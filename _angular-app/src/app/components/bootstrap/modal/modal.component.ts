import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

declare const $: any;

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output()
  onHide: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    const jqueyElement = this.getJqueryElement();

    jqueyElement.find('[modal-title]').addClass('modal-title');
    jqueyElement.find('[modal-body]').addClass('modal-body');
    jqueyElement.find('[modal-footer]').addClass('modal-footer');

    jqueyElement.on('hidden.bs.modal', (e: any) =>{
      console.log(e);
        this.onHide.emit(e);
    })
  }

  show(){
    this.getJqueryElement().modal('show');
  }

  hide(){
    this.getJqueryElement().modal('hide');
  }

  private getJqueryElement(){
      const nativeElement = this.element.nativeElement;
      return $(nativeElement.firstChild);
  }

}
