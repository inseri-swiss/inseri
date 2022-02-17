import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedTextLinepartComponent } from './joined-text-linepart.component';

describe('JoinedTextLinepartComponent', () => {
  let component: JoinedTextLinepartComponent;
  let fixture: ComponentFixture<JoinedTextLinepartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedTextLinepartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedTextLinepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
