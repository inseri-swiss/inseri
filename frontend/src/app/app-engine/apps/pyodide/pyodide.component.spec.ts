import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PyodideComponent } from './pyodide.component';

describe('PyodideComponent', () => {
  let component: PyodideComponent;
  let fixture: ComponentFixture<PyodideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PyodideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PyodideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
