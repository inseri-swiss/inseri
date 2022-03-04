import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActionService } from 'src/app/user-action-engine/mongodb/action/action.service';
import { PageService } from 'src/app/user-action-engine/mongodb/page/page.service';
import { PageSetService } from 'src/app/user-action-engine/mongodb/pageset/page-set.service';
import { QueryService } from 'src/app/user-action-engine/mongodb/query/query.service';

import { PageListDialogComponent } from './page-list-dialog.component';

describe('PageListDialogComponent', () => {
  let component: PageListDialogComponent;
  let fixture: ComponentFixture<PageListDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule],
      declarations: [ PageListDialogComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {page: '7', actionID: ''},
              url: [{path: ''}]
            },
            queryParams: of()
          }
        },
        { provide: QueryService, useValue: {} },
        { provide: PageService, useValue: {
            getPublishedPages: () => of()
          }
        },
        { provide: ActionService, useValue: {
            getAllActionsOfUser: () => of()
          }
        },
        { provide: PageSetService, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
