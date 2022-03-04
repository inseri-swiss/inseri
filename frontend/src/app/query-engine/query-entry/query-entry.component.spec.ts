import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AbstractJsonService } from 'src/app/query-app-interface/data-management/services/abstract-json.service';
import { QueryService } from 'src/app/user-action-engine/mongodb/query/query.service';
import { GeneralRequestService } from '../general/general-request.service';
import { QueryEntryComponent } from './query-entry.component';

describe('QueryEntryComponent', () => {
  let component: QueryEntryComponent;
  let fixture: ComponentFixture<QueryEntryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ QueryEntryComponent ],
      providers: [
        AbstractJsonService,
        { provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {query: {_id: 3}} },
        { provide: QueryService, useValue: {
          getQuery: () => of()
        }},
        { provide: GeneralRequestService, useValue: {}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
