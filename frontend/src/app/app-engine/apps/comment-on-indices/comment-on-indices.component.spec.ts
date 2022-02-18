import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommentOnIndicesComponent } from './comment-on-indices.component';
import { ActivatedRoute } from '@angular/router';

describe('CommentOnIndicesComponent', () => {
  let component: CommentOnIndicesComponent;
  let fixture: ComponentFixture<CommentOnIndicesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ CommentOnIndicesComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {snapshot: { queryParams: {path: '7'}}}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentOnIndicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
