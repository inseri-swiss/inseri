import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinedTextViewRequestService } from '../joined-text-view-request.service';
import { JoinedTextLinepartComponent } from './joined-text-linepart.component';

describe('JoinedTextLinepartComponent', () => {
  let component: JoinedTextLinepartComponent;
  let fixture: ComponentFixture<JoinedTextLinepartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedTextLinepartComponent ],
      providers: [{ provide: JoinedTextViewRequestService, useValue: {} }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedTextLinepartComponent);
    component = fixture.componentInstance;
    component.linepartConfiguration = {
      propertyIri: '',
      propertyDirection: '',
      prefix: ''
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
