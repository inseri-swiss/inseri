import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IframeComponent } from './iframe.component';

describe('IframeComponent', () => {
  let component: IframeComponent;
  let fixture: ComponentFixture<IframeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ IframeComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {snapshot: { queryParams :[{url: 'not-home'}]}}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeComponent);
    component = fixture.componentInstance;
    component.url = "localhost"
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
