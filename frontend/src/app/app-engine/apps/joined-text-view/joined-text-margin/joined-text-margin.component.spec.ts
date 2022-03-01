import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinedTextViewRequestService } from '../joined-text-view-request.service';

import { JoinedTextMarginComponent } from './joined-text-margin.component';

describe('JoinedTextMarginComponent', () => {
  let component: JoinedTextMarginComponent;
  let fixture: ComponentFixture<JoinedTextMarginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedTextMarginComponent ],
      providers: [{ provide: JoinedTextViewRequestService, useValue: {} }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedTextMarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
