import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { CrisprComponent } from './crispr.component';

describe('CrisprComponent', () => {
  let component: CrisprComponent;
  let fixture: ComponentFixture<CrisprComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CrisprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrisprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
