import { TestBed } from '@angular/core/testing';

import { SubjectLocationService } from './subject-location.service';

describe('SubjectLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubjectLocationService = TestBed.get(SubjectLocationService);
    expect(service).toBeTruthy();
  });
});
