import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategotyEditModalComponent } from './categoty-edit-modal.component';

describe('CategotyEditModalComponent', () => {
  let component: CategotyEditModalComponent;
  let fixture: ComponentFixture<CategotyEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategotyEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategotyEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
