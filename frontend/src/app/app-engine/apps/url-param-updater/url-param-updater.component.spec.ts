import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralRequestService } from 'src/app/query-engine/general/general-request.service';
import { UrlParamUpdaterComponent } from './url-param-updater.component';

describe('UrlParamUpdaterComponent', () => {
  let component: UrlParamUpdaterComponent;
  let fixture: ComponentFixture<UrlParamUpdaterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ UrlParamUpdaterComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: GeneralRequestService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlParamUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
