import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomWalkerComponent } from './random-walker.component';

describe('RandomWalkerComponent', () => {
  let component: RandomWalkerComponent;
  let fixture: ComponentFixture<RandomWalkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomWalkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomWalkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
