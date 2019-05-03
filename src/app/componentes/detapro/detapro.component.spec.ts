import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaproComponent } from './detapro.component';

describe('DetaproComponent', () => {
  let component: DetaproComponent;
  let fixture: ComponentFixture<DetaproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaproComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
