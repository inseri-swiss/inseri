import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedTextMarginComponent } from './joined-text-margin.component';

describe('JoinedTextMarginComponent', () => {
  let component: JoinedTextMarginComponent;
  let fixture: ComponentFixture<JoinedTextMarginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedTextMarginComponent ]
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
