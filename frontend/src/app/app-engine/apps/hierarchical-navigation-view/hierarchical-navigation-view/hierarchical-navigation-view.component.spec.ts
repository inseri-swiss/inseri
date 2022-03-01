import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HierarchicalNavigationViewComponent } from './hierarchical-navigation-view.component';

describe('HierarchicalNavigationViewComponent', () => {
  let component: HierarchicalNavigationViewComponent;
  let fixture: ComponentFixture<HierarchicalNavigationViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ HierarchicalNavigationViewComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {queryParams: {}}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchicalNavigationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
