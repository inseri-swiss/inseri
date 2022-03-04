import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { ActionService } from 'src/app/user-action-engine/mongodb/action/action.service';
import { OpenAppsModel } from 'src/app/user-action-engine/mongodb/page/open-apps.model';
import { PageService } from 'src/app/user-action-engine/mongodb/page/page.service';
import { QueryService } from 'src/app/user-action-engine/mongodb/query/query.service';

import { DataManagementComponent } from './data-management.component';

describe('DataManagementComponent', () => {
  let component: DataManagementComponent;
  let fixture: ComponentFixture<DataManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientTestingModule],
      declarations: [ DataManagementComponent ],
      providers: [
        NgxSpinnerService,
        ActionService,
        PageService,
        QueryService,
        OpenAppsModel,
        {provide: MAT_DIALOG_DATA, useValue: [
          {},
          {appInputQueryMapping: []},
          []
        ]},
        {provide: MatDialogRef, useValue: {}},
        {provide: QueryService, useValue: {
          getAllQueriesOfPage: () => of()
        }},
        {provide: ActivatedRoute, useValue: {}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
