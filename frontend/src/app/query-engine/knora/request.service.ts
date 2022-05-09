import {Injectable} from '@angular/core';
import {RequestTemplate} from './request-template';
import {Observable} from 'rxjs';


@Injectable()
export abstract class RequestService {

  abstract send(template: RequestTemplate): Observable<any>;

}

