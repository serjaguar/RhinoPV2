import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaproComponent } from './altapro.component';

describe('AltaproComponent', () => {
  let component: AltaproComponent;
  let fixture: ComponentFixture<AltaproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaproComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
