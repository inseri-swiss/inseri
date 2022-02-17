import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LightTableMenuComponent} from './light-table-menu.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {LightTableLayoutService} from '../light-table-layout.service';

describe('LightTableMenuComponent', () => {
  let component: LightTableMenuComponent;
  let fixture: ComponentFixture<LightTableMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [LightTableMenuComponent],
      providers: [LightTableLayoutService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightTableMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
