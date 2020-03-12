import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { SubjectLocation } from './square';

@Injectable({
  providedIn: 'root'
})
export class SubjectLocationService {


  private subjectLocations =  new Subject<SubjectLocation>();


  constructor() { }

  publishLocation( subjectLocation:SubjectLocation ) {
    this.subjectLocations.next(subjectLocation);
  }

  getSubjectLocations() {
    return this.subjectLocations;
  }
}
