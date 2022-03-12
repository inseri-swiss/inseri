import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from '../mongodb/action/action.service';
import { AuthService } from '../mongodb/auth/auth.service';
import { of } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule, MatSnackBarModule, MatMenuModule],
			declarations: [ HeaderComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: {
          queryParams: of()
         }
        },
        { provide: AuthService, useValue: {
          getIsAuth: ()=>{},
          getAuthStatusListener: () => of()
        } },
        { provide: ActionService, useValue: {} },
      ],
			schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
