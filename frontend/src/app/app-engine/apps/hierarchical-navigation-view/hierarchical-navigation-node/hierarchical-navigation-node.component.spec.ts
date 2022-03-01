import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HierarchicalNavigationRequestService } from '../hierarchical-navigation-request.service';

import { HierarchicalNavigationNodeComponent } from './hierarchical-navigation-node.component';

describe('HierarchicalNavigationNodeComponent', () => {
  let component: HierarchicalNavigationNodeComponent;
  let fixture: ComponentFixture<HierarchicalNavigationNodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchicalNavigationNodeComponent ],
      providers:[ {provide: HierarchicalNavigationRequestService, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchicalNavigationNodeComponent);
    component = fixture.componentInstance;
    component.resource = {
      "@id": "myvalue"
    }

    component.pathMap = {
      "mykey": "myvalue"
    }

    component.nodeConfiguration = {
      propertyIri: "",
      propertyDirection: "",
      routeKey: "mykey"
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
