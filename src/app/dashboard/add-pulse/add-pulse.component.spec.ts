import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPulseComponent } from './add-pulse.component';

describe('AddPulseComponent', () => {
  let component: AddPulseComponent;
  let fixture: ComponentFixture<AddPulseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPulseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPulseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
