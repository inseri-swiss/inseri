import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedTextBlockComponent } from './joined-text-block.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { JoinedTextViewRequestService } from '../joined-text-view-request.service';

describe('JoinedTextBlockComponent', () => {
  let component: JoinedTextBlockComponent;
  let fixture: ComponentFixture<JoinedTextBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedTextBlockComponent ],
      providers: [{ provide: JoinedTextViewRequestService, useValue: {} }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedTextBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
