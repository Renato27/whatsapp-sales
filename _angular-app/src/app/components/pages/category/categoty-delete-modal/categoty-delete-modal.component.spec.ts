import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategotyDeleteModalComponent } from './categoty-delete-modal.component';

describe('CategotyDeleteModalComponent', () => {
  let component: CategotyDeleteModalComponent;
  let fixture: ComponentFixture<CategotyDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategotyDeleteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategotyDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
