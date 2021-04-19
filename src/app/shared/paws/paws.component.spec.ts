import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PawsComponent } from './paws.component';

describe('PawsComponent', () => {
  let component: PawsComponent;
  let fixture: ComponentFixture<PawsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PawsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PawsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
