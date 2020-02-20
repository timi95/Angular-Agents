import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkerObjectifiedComponent } from './walker-objectified.component';

describe('WalkerObjectifiedComponent', () => {
  let component: WalkerObjectifiedComponent;
  let fixture: ComponentFixture<WalkerObjectifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkerObjectifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkerObjectifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
