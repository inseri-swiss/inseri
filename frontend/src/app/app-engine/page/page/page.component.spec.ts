import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { StyleMappingService } from 'src/app/query-app-interface/services/style-mapping-service';
import { GeneralRequestService } from 'src/app/query-engine/general/general-request.service';
import { ActionService } from 'src/app/user-action-engine/mongodb/action/action.service';
import { OpenAppsModel } from 'src/app/user-action-engine/mongodb/page/open-apps.model';
import { PageService } from 'src/app/user-action-engine/mongodb/page/page.service';
import { PageSetService } from 'src/app/user-action-engine/mongodb/pageset/page-set.service';
import { QueryService } from 'src/app/user-action-engine/mongodb/query/query.service';
import { GenerateHashService } from 'src/app/user-action-engine/other/generateHash.service';

import { PageComponent } from './page.component';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule, RouterTestingModule, MatSnackBarModule, MatMenuModule],
      declarations: [ PageComponent ],
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
        { provide: GenerateHashService, useValue: {} },
        { provide: OpenAppsModel, useValue: {} },
        { provide: PageService, useValue: {} },
        { provide: PageSetService, useValue: {} },
        { provide: GeneralRequestService, useValue: {} },
        { provide: StyleMappingService, useValue: {} },
        { provide: ActionService, useValue: {
            checkIfShortNameExist: () => of()
          }
        },
        { provide: QueryService, useValue: {} },
        { provide: OverlayContainer, useValue: {
          getContainerElement: () => document.createElement("div")
          }
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });
});
