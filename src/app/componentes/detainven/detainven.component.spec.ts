import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetainvenComponent } from './detainven.component';

describe('DetainvenComponent', () => {
  let component: DetainvenComponent;
  let fixture: ComponentFixture<DetainvenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetainvenComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetainvenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
