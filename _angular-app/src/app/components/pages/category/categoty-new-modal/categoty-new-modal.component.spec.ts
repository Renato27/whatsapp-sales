import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategotyNewModalComponent } from './categoty-new-modal.component';

describe('CategotyNewModalComponent', () => {
  let component: CategotyNewModalComponent;
  let fixture: ComponentFixture<CategotyNewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategotyNewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategotyNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
