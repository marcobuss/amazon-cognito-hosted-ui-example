import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitoCallbackComponent } from './cognito-callback.component';

describe('CognitoCallbackComponent', () => {
  let component: CognitoCallbackComponent;
  let fixture: ComponentFixture<CognitoCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CognitoCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitoCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
