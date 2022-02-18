import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { CanvasWhiteboardComponent } from './canvas-whiteboard.component';
import { ActivatedRoute } from '@angular/router';

describe('CanvasWhiteboardComponent', () => {
  let component: CanvasWhiteboardComponent;
  let fixture: ComponentFixture<CanvasWhiteboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CanvasWhiteboardComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {snapshot: { url :[{path: 'not-home'}]}}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasWhiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
