import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { KnoraV2ViewerRequestService } from '../knora-v2-viewer-request.service';
import { KnoraV2ViewerComponent } from './knora-v2-viewer.component';

describe('KnoraV2Viewer', () => {
  let component: KnoraV2ViewerComponent;
  let fixture: ComponentFixture<KnoraV2ViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KnoraV2ViewerComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: KnoraV2ViewerRequestService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnoraV2ViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
