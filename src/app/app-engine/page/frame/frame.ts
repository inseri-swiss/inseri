/**
 * The frame.component is the "container" for every app
 * and takes care of the all general app - information,
 * for example the app - title - bar, the current position,
 * the drag - and - drop attributes etc.
 * */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  ContentChildren,
  QueryList,
  ElementRef,
  Renderer2, OnInit, OnChanges, AfterViewChecked
} from '@angular/core';
import 'rxjs/add/operator/map';
import {MatDialog} from '@angular/material';
import { FrameSettingsComponent } from '../frame-settings/frame-settings.component';
import {ActivatedRoute, Router} from '@angular/router';
import { DataAssignmentComponent } from '../../../query-app-interface/data-management/data-assignment/data-assignment.component';
import {QueryEntryComponent} from '../../../query-engine/query-entry/query-entry.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'popup',
  templateUrl: 'frame.html',
  styleUrls: ['frame.css']
})
export class Frame implements OnInit, OnChanges, AfterViewChecked {

  /**
   * @param show - indicates if app is minimalized or not
   * */
  show = false;
  /**
   * @param title - title of the app
   * */
  @Input() title: string;
  /**
   * @param type - type of the app
   * */
  @Input() type: string;
  /**
   * @param firstPopupX - if app is opened for the first time, this variable indicates where it should disappear vertically
   * */
  @Input() firstPopupX: number;
  /**
   * @param firstPopupY - if app is opened for the first time, this variable indicates where it should disappear horizontally
   * */
  @Input() firstPopupY: number;
  /**
   * @param hash - hash of the open app, this has to be emitted for the page so that the page knows which app is emmitting the information
   * */
  @Input() hash: string;
  /**
   * @param width, height - width and height of the open app
   * */
  @Input() width: number;
  /**
   * @param width, height - width and height of the open app
   * */
  @Input() height: number;
  /**
   * @param position - "static" if the option "sort by appType" is chosen, "absolute" otherwise
   * */
  @Input() response: any;
  @Input() pathsWithArrays: any;
  @Input() position: string;
  @Input() fullWidth: boolean;
  @Input() fullHeight: boolean;
  @Input() preview = false;
  @Input() showAppSettingsOnPublish = true;
  @Input() page: any;
  @Input() app: any;
  @Input() openAppArrayIndex: number;
  @Output() sendAppCoordinatesBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendAppSettingsBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendIndexBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendTiledPositionBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendAssignInputCommandBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() minimizeApp: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeAppEmitter: EventEmitter<any> = new EventEmitter<any>();

  mousemoveEvent: any;
  mouseupEvent: any;
  firstPopupZ = 3;
  xStep = 30;
  yStep = 30;
  zStep = 3;
  curX: any;
  curY: any;
  curZIndex: any;
  xStartElementPoint: number;
  yStartElementPoint: number;
  xStartMousePoint: number;
  yStartMousePoint: number;
  fatherPopup: any;
  sendCoordinatesBack: any;
  isMouseBtnOnPress: boolean;
  paths: any;
  index = 0;
  pathWithArray: Array<any>;
  queryId: string;
  dataChooserEntries: Array<string>;
  dataAssignmentComponent = new DataAssignmentComponent(  );
  sub: any;

  panelExtended = false;
  @Input () showContent = true;
  searchTerm: string;
  newDataChooserEntries = [];


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.mouseup = this.unboundMouseup.bind(this);
    this.dragging = this.unboundDragging.bind(this);
  }

  /**
   * This is necessary for the app to be able to react onChanges regarding the input data for the apps,
   * for example updated App - Settings or updated App - Title
   * */
  ngOnChanges() {
    this.index = 0;
    console.log( 'change' );
    this.paths = [];
    if ( this.app ) {
      const pathsWithArrays = this.app.pathsWithArrays;
      for ( const queryId in pathsWithArrays ) {
        for ( const path in pathsWithArrays[ queryId ] ) {
          this.paths.push(
            {
              queryId: queryId,
              path: path.split(','),
              index: pathsWithArrays[ queryId ][ path ].index,
              response: pathsWithArrays[ queryId ][ path ].response,
              dataChooserEntries: pathsWithArrays[ queryId ][ path ].dataChooserEntries,
              pathToValueInJson: pathsWithArrays[ queryId ][ path ].pathToValueInJson
            }
          );
          this.pathWithArray = path.split(',');
          this.queryId = queryId;
          this.dataChooserEntries = pathsWithArrays[ queryId ][ path ].dataChooserEntries;
        }
      }
      this.dataAssignmentComponent = new DataAssignmentComponent(  );
      this.newDataChooserEntries = [];
      // console.log( this.dataChooserEntries );
      for ( const path of this.paths ) {
        console.log( path.pathToValueInJson );
        for ( let i = 0; i < this.dataChooserEntries.length; i++ ) {
          this.newDataChooserEntries[ i ] = this.dataAssignmentComponent.generateAppinput(
            path.response,
            path.pathToValueInJson,
            i,
            0,
            true
          );
          // console.log( this.newDataChooserEntries[ i ] );
        }
        // console.log( this.newDataChooserEntries );
      }
    }
  }

  ngAfterViewChecked() {
    if (
      this.pathWithArray && this._route.snapshot.queryParams[ this.queryId + this.pathWithArray.toString() ] &&
      this._route.snapshot.queryParams[ this.queryId + this.pathWithArray.toString() ] !== this.index ) {
      this.index = Number ( this._route.snapshot.queryParams[ this.queryId + this.pathWithArray.toString() ] );
    }
  }

  checkIfUrlIsImage(url: string) {
    if ( url ) {
      return(
        url.match(/\.(jpeg|jpg|gif|png)$/) != null ||
        url.match(/(jpeg|jpg|gif|png)$/) != null
      );
    } else {
      return false;
    }
  }

  moveBack() {
    this.chooseResource( this.index - 1 );
  }

  moveForward() {
    this.chooseResource( this.index + 1 );
  }

  chooseResource(index: number) {
    this.panelExtended = false;
    this.fullWidth = false;
    this.fullHeight = false;
    this._router.navigate([], {
      queryParams: {
        [this.queryId + this.pathWithArray.toString() ]: Number( index )
      },
      queryParamsHandling: 'merge'
    });
  }

  stopPropagation(event) {
    event.stopPropagation();
    // console.log("Clicked!");
  }

  /**
   * When open at first, the app appears at the coordinates (100|100)
   * */
  ngOnInit() {
    // If coordinates of window are set through input, let it appear
    if ( this.firstPopupX && this.firstPopupY ) {
      this.appear();
    } else {
      this.firstPopupX = 100;
      this.firstPopupY = 100;
    }
    Observable.interval(1000)
      .subscribe((val) => {
        if ( document.getElementById('app') !== null ) {
          this.height = document.getElementById('app').offsetHeight;
          this.width = document.getElementById('app').offsetWidth;
        }
      });
    this.curZIndex += 1;
    localStorage.setItem( 'curZIndex', this.curZIndex + 1 );
  }

  appear() {
    // prevent drag event
    document.getSelection().removeAllRanges();
    this.setPos();
    this.show = true;
    this.setNewZIndex();
  }

  disappear() {
    this.minimizeApp.emit( this.openAppArrayIndex );
  }

  setPos() {
    if (this.fatherPopup == undefined ) {
      this.curX = this.firstPopupX;
      this.curY = this.firstPopupY;
      this.curZIndex = this.firstPopupZ;
    }
    else {
      this.curX = this.fatherPopup.curX + this.xStep;
      this.curY = this.fatherPopup.curY + this.yStep;
      this.curZIndex = this.fatherPopup.curZIndex + this.zStep;
    }
  }

  mouseup: (event: any) => void;
  unboundMouseup(event: any) {
    // Remove listeners
    this.sendCoordinatesBack = {};
    this.sendCoordinatesBack.x = this.curX;
    this.sendCoordinatesBack.y = this.curY;
    this.sendCoordinatesBack.type = this.type;
    this.sendCoordinatesBack.hash = this.hash;
    this.sendCoordinatesBack.title = this.title;
    this.sendCoordinatesBack.width = this.width;
    this.sendCoordinatesBack.height = this.height;
    this.sendCoordinatesBack.fullWidth = this.fullWidth;
    this.sendCoordinatesBack.fullHeight = this.fullHeight;
    this.sendAppCoordinatesBack.emit(
      this.sendCoordinatesBack
    );
    this.mousemoveEvent();
    this.mouseupEvent();
  }

  mousedown(event: any) {
    if (event.button === 0/*only left mouse click*/) {
      this.xStartElementPoint = this.curX;
      this.yStartElementPoint = this.curY;
      this.xStartMousePoint = event.pageX;
      this.yStartMousePoint = event.pageY;

      // if listeners exist, first Remove listeners
      if (this.mousemoveEvent)
        this.mousemoveEvent();
      if (this.mouseupEvent)
        this.mouseupEvent();

      this.mousemoveEvent = this.renderer.listen("document", "mousemove", this.dragging);
      this.mouseupEvent = this.renderer.listen("document", "mouseup", this.mouseup);
    }
  }
  dragging: (event: any) => void;
  unboundDragging(event: any) {
    // console.log(this.sendCoordinatesBack);
    this.curX = this.xStartElementPoint + (event.pageX - this.xStartMousePoint);
    this.curY = this.yStartElementPoint + (event.pageY - this.yStartMousePoint);
  }

  openSettings() {
    console.log( 'Open Settings' );
    const dialogRef = this.dialog.open(FrameSettingsComponent, {
      width: '50%',
      height: '50%',
      data: [
        this.title,
        this.width,
        this.height,
        this.fullWidth,
        this.fullHeight
      ]
    });
    /**
     * After the dialog is closed, all settings are send back to the page.
     * This emit triggers the update of the frame - inputs through onChanges.
     * Thus, the inputs of the frame are not updated immediatly in the frame.component
     * but through the onChanges - Event. This is necessary in order for the page
     * to be able to save all app - settings immediately.
     * */
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if ( result ) {
        this.sendAppSettingsBack.emit(
          {
            title: result[ 0 ],
            width: result[ 1 ],
            height: result[ 2 ],
            hash: this.hash,
            type: this.type,
            fullWidth: result[ 3 ],
            fullHeight: result[ 4 ]
          }
        );

      }
    });
  }

  /**
   * This routine makes sure that when you click on the app
   * it comes to thr foreground
   * */
  setNewZIndex() {
    // console.log( 'Set new z index;' );
    // console.log( this.curZIndex );
    const savedZIndex = localStorage.getItem('curZIndex');
    if ( savedZIndex === null ) {
      this.curZIndex += 1;
      localStorage.setItem( 'curZIndex', this.curZIndex + 1 );
    } else {
      this.curZIndex = +savedZIndex + 1;
      localStorage.setItem( 'curZIndex', this.curZIndex );
    }
  }

  assignInput() {
    console.log( 'assign input' );
    this.sendAssignInputCommandBack.emit( {hash: this.hash, type: this.type} );
  }

  closeApp() {
    this.closeAppEmitter.emit();
  }

}
