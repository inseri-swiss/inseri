import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { PrimeEditorComponent } from './prime-editor.component';

describe('PrimeEditorComponent', () => {
  let component: PrimeEditorComponent;
  let fixture: ComponentFixture<PrimeEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PrimeEditorComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: {snapshot: { url :[{path: 'not-home'}]}} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
