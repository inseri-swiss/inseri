import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { of, Observable } from 'rxjs';
import {MicroserviceService} from '../../../user-action-engine/mongodb/microservice/microservice.service';
import {FileService} from '../../../user-action-engine/file/file.service';
import 'ace-builds/src-noconflict/mode-python';
import { materialize, dematerialize, mergeMap } from 'rxjs/operators';
import { GeneralRequestService } from 'src/app/query-engine/general/general-request.service';

@Component({
  selector: 'app-python-environment',
  templateUrl: './python-environment.component.html',
  styleUrls: ['./python-environment.component.scss']
})
export class PythonEnvironmentComponent implements OnChanges, HttpInterceptor {

  @Input() hash: string;
  @Input() assignedJson: any;
  @Input() pythonFile: any;
  @Input() appInputQueryMapping: string;
  @Output() reloadVariables: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('editor', { static: true }) editor;
  serivceId = 'pythonEnvironment';
  display = JSON.parse( localStorage.getItem( this.serivceId ) );
  output: any;
  constructor(
    private http: HttpClient,
    private microserviceService: MicroserviceService,
    public fileService: FileService,
    public requestService: GeneralRequestService
  ) {
  }

  ngOnChanges( changes: SimpleChanges ) {
    // console.log( 'changes', this.hash, this.assignedJson, this.pythonFile );
    if ( this.hash && this.pythonFile ) {
      this.display = { hash: this.hash, json: this.assignedJson };
      if ( this.pythonFile.search( 'http' ) !== -1 ) {
        this.http.get( this.pythonFile, { responseType: 'text' } )
          .subscribe(
            data => {
              // console.log( data );
              this.editor.text = data;
              this.submitToMicroservice();
            }, error => {
              console.log( error );
            }
          );
      } else {
        this.editor.text = this.pythonFile;
        this.submitToMicroservice();
      }
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const pythonEnvironmentInstances = JSON.parse( localStorage.getItem( this.serivceId ) );
    const pythonEnvironmentSet = new Set();

    for ( const service in pythonEnvironmentInstances ) {
      pythonEnvironmentSet.add( pythonEnvironmentInstances[ 'hash' ] );
    }

    return of(null).pipe(mergeMap(() => {
      if ( pythonEnvironmentSet.has( request.url ) ) {
        // console.log( 'interceptor is triggered' );
        const body = pythonEnvironmentInstances;
        // localStorage.removeItem( this.serivceId );
        return of(new HttpResponse({ status: 200, body: JSON.parse( localStorage.getItem( this.serivceId ) ).output } ));
      } else {
        return next.handle(request);
      }
    }))
    .pipe(materialize())
    .pipe(dematerialize());
  }

  submitToMicroservice() {
    // console.log( 'Submit to Microservice', this.display, this.editor.text );
    const body = {
      datafile: 'yourData.json',
      data: JSON.stringify(this.display),
      codefile: 'yourCode.py',
      code: this.editor.text
    };
    this.microserviceService.postToMicroservice( this.serivceId, body, {})
      .subscribe(
        data => {
          // console.log( data );
          this.output = { [this.serivceId + ' output']: data.output };
          const localStorageBefore = JSON.parse( localStorage.getItem( this.serivceId ));
          localStorage.setItem(
            this.serivceId,
            JSON.stringify(
              {
                hash: this.hash,
                json: this.assignedJson,
                pythonCode: this.editor.text,
                output: this.output
              }));
          const localStorageAfter = JSON.parse( localStorage.getItem( this.serivceId ) );
          setTimeout(() => {
            // console.log( localStorageBefore, localStorageAfter );
          }, 1000);
          if ( JSON.stringify( localStorageBefore ) !== JSON.stringify( localStorageAfter ) ) {
            console.log( 'emit' );
            this.reloadVariables.emit();
          }
        }
        , error => {
          console.log( error );
          this.output = { [this.serivceId + ' output']: error.error.output } ;
        }
      );
  }

  savePythonFile( submit?: boolean ) {
    const isPythonFileAnURL = (this.pythonFile || '').startsWith("http")

    if(isPythonFileAnURL){
      this.fileService.getFileByUrl( this.pythonFile )
        .subscribe(response => {
          const file = (response as any).file;
          this.fileService.updateFile(
            file._id,
            file.title,
            file.description,
            this.editor.text,
            this.pythonFile)
            .subscribe(savedFile => {
                if ( submit ) {
                  this.submitToMicroservice();
                }
            });
        });
    } else {
      this.requestService.updateFile(
        this.appInputQueryMapping[this.hash]['pythonFile']['serverUrl'].split('/')[6],
        {
          [this.hash]: {
            pythonFile: this.editor.text
          }
        }
      ).subscribe(data => {
        if ( submit ) {
          this.submitToMicroservice();
        }
      })
    }
  }

  updateCodeInLocalStorage() {
    localStorage.setItem(
      this.serivceId,
      JSON.stringify({ hash: this.hash, json: this.assignedJson, pythonCode: this.editor.text } ));
  }

}
