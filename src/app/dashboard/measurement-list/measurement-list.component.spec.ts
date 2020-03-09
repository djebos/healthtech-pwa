import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementListComponent } from './measurement-list.component';

describe('MeasurementComponent', () => {
  let component: MeasurementListComponent;
  let fixture: ComponentFixture<MeasurementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
