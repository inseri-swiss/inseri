import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { GeneralRequestService } from 'src/app/query-engine/general/general-request.service';
import { FileService } from 'src/app/user-action-engine/file/file.service';
import { ActionService } from 'src/app/user-action-engine/mongodb/action/action.service';
import { FolderService } from 'src/app/user-action-engine/mongodb/folder/folder.service';
import { PageService } from 'src/app/user-action-engine/mongodb/page/page.service';
import { PageSetService } from 'src/app/user-action-engine/mongodb/pageset/page-set.service';
import { QueryService } from 'src/app/user-action-engine/mongodb/query/query.service';
import { GenerateHashService } from 'src/app/user-action-engine/other/generateHash.service';
import { PageComponent } from '../../page/page/page.component';

import { MyFilesComponent } from './my-files.component';

describe('MyFilesComponent', () => {
  let component: MyFilesComponent;
  let fixture: ComponentFixture<MyFilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule, RouterTestingModule, MatMenuModule],
      declarations: [ MyFilesComponent ],
      providers: [
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: FolderService, useValue: {
          showFolders(id){
            return of()
          }
          }
        },
        { provide: ActionService, useValue: {} },
        { provide: QueryService, useValue: {} },
        { provide: PageSetService, useValue: {} },
        { provide: PageService, useValue: {} },
        { provide: FileService, useValue: {
            getFileUpdateListener(){
              return of()
            }
          }
        },
        { provide: ActivatedRoute, useValue: {
            paramMap: of()
          }
        },
        { provide: GenerateHashService, useValue: {} },
        { provide: GeneralRequestService, useValue: {} },
        { provide: PageComponent, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
