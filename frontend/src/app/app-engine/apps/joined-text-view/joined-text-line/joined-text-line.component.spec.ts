import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinedTextViewRequestService } from '../joined-text-view-request.service';

import { JoinedTextLineComponent } from './joined-text-line.component';

describe('TextLineComponent', () => {
  let component: JoinedTextLineComponent;
  let fixture: ComponentFixture<JoinedTextLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedTextLineComponent ],
      providers: [{ provide: JoinedTextViewRequestService, useValue: {} }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedTextLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
