import {Injectable} from '@angular/core';
import {RequestService} from './request.service';
import {RequestTemplate} from './request-template';
import {Observable} from 'rxjs';
import {KnoraAuthService} from './knora-auth.service';

@Injectable()
export class KnoraRequestService extends RequestService {

  constructor(knoraAuthService: KnoraAuthService) {
    super();
  }

  send(template: RequestTemplate): Observable<any> {
    return undefined;
  }

}
