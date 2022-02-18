import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FileDatabaseForAppGND, GndLobidComponent } from './gnd-lobid.component';

describe('GndLobidComponent', () => {
  let component: GndLobidComponent;
  let fixture: ComponentFixture<GndLobidComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ GndLobidComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {snapshot: { queryParams :{gnd: 'any'}}}
        },
        {
          provide: FileDatabaseForAppGND,
          useValue: new FileDatabaseForAppGND()
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GndLobidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
