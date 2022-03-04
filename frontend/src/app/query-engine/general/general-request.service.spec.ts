import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from 'src/app/user-action-engine/mongodb/query/query.service';

import { GeneralRequestService } from './general-request.service';

describe('GeneralRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GeneralRequestService,
        QueryService,
        {provide: ActivatedRoute, useValue: {}}
      ]
    });
  });

  it('should be created', inject([GeneralRequestService], (service: GeneralRequestService) => {
    expect(service).toBeTruthy();
  }));
});
