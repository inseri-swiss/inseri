import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { QueryService } from '../../mongodb/query/query.service';

import { DuplicatePageComponent } from './duplicate-page.component';

describe('DuplicatePageComponent', () => {
  let component: DuplicatePageComponent;
  let fixture: ComponentFixture<DuplicatePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicatePageComponent ],
      providers: [
        { provide: QueryService, useValue: {
          getAllQueriesOfPage: () => of()
        } },
        { provide: MAT_DIALOG_DATA, useValue: { page: {_id : ''}} },
        { provide: MatDialogRef, useValue: {} },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
