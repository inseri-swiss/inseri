import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HierarchicalNavigationRequestService } from '../hierarchical-navigation-request.service';
import { HierarchicalNavigationRootComponent } from './hierarchical-navigation-root.component';

describe('HierarchicalNavigationRootComponent', () => {
  let component: HierarchicalNavigationRootComponent;
  let fixture: ComponentFixture<HierarchicalNavigationRootComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchicalNavigationRootComponent ],
      providers:[ {provide: HierarchicalNavigationRequestService, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchicalNavigationRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
