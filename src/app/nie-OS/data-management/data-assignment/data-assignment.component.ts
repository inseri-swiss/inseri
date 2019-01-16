import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-data-assignment',
  templateUrl: './data-assignment.component.html'
})
export class DataAssignmentComponent implements OnChanges {
  @Input() index: number;
  @Input() openAppsInThisPage: any;
  @Input() appInputQueryMapping: any;
  @Input() response: any;
  @Input() queryId;
  @Output() sendAppTypesBackToNIEOS: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnChanges() {
    this.goThroughAppInputs();
  }

  goThroughAppInputs() {
    for ( const type in this.openAppsInThisPage ) {
      if (  this.openAppsInThisPage[ type ].model.length && type !== 'dataChooser' ) {
        for ( const app of this.openAppsInThisPage[ type ].model ) {
          if ( this.appInputQueryMapping[ app.hash ] ) {
            for ( const input in this.appInputQueryMapping[ app.hash ] ) {
              if ( this.appInputQueryMapping[ app.hash ][ input ][ 'query' ] === this.queryId ) {
                let increment = 0;
                for ( const segment of this.appInputQueryMapping[ app.hash ][ input ][ 'path' ] ) {
                  if ( segment === null ) {
                    this.appInputQueryMapping[ app.hash ][ input ][ 'path' ].splice( increment, 1 );
                  }
                  increment += 1;
                }
                app[ input ] = this.generateAppinput(
                  this.response,
                  this.appInputQueryMapping[ app.hash ][ input ][ 'path' ],
                  this.index,
                  0,
                  true,
                  app
                );
              }
            }
          }
        }
      }
    }
    this.sendAppTypesBackToNIEOS.emit( this.openAppsInThisPage );
  }

  generateAppinput(
    response: any,
    path: any,
    index: number,
    depth: number,
    firstArray: boolean,
    app: any
  ) {
    // console.log( depth, path.length );
    if ( response ) {
        if ( path.length === 1 ) {
          return response[ path[ 0 ] ];
        } else if ( response.length  ) {                                          // Response is an array
          if ( typeof response === 'string' ) {
            return response;
          } else {
            if ( firstArray ) {
              return this.generateAppinput(
                response[ index ],
                path,
                index,
                depth + 1,
                false,
                app
              );
            } else {
              return this.generateArrayInput(
                response,
                path,
                index,
                depth,
                false,
                app
              );
            }
          }
        } else if ( depth !== path.length && response[ path[ depth ] ] ) {        // Response is not an array
          return this.generateAppinput(
            response[ path[ depth ] ],
            path,
            index,
            depth + 1,
            firstArray,
            app
          );
        } else if ( depth === path.length ) {
          // console.log( response );
          return response[ path[ depth - 1 ] ];
        } else if ( path.length - 1 === depth &&  Number( path[ depth ] ) ) {
          return response[ path[ depth - 1 ] ][ Number( path[ depth ] ) ];
        } else {
          return this.generateAppinput(
            response[ path[ depth - 1 ] ],
            path, index,
            depth + 1,
            firstArray,
            app
          );
      }
    }
  }

  generateArrayInput(
    response: any,
    path: any,
    index: number,
    depth: number,
    firstArray: boolean,
    app: any
  ) {
    app.index = 0;
    app.arrayLength = response.length;
    // console.log( 'Generate Array Input', response );
    return this.generateAppinput(
      response[ app.index ],
      path,
      app.index,
      depth,
      true,
      app
    );
  }
}
