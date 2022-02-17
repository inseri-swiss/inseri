import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedTextBlockComponent } from './joined-text-block.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('JoinedTextBlockComponent', () => {
  let component: JoinedTextBlockComponent;
  let fixture: ComponentFixture<JoinedTextBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedTextBlockComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
