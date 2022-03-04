import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ActionService } from 'src/app/user-action-engine/mongodb/action/action.service';
import { PageService } from 'src/app/user-action-engine/mongodb/page/page.service';
import { PageSetService } from 'src/app/user-action-engine/mongodb/pageset/page-set.service';

import { DeleteActionComponent } from './delete-action.component';

describe('DeleteActionComponent', () => {
  let component: DeleteActionComponent;
  let fixture: ComponentFixture<DeleteActionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ DeleteActionComponent ],
      providers: [
        ActionService,
        { provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {hasPageSet: {}} },
        { provide: PageSetService, useValue: {
          getPageSet: () => of()
        }},
        { provide: PageService, useValue: {
          getPage: () => of()
        }},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
