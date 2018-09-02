import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureSiteComponent } from './secure-site.component';

describe('SecureSiteComponent', () => {
  let component: SecureSiteComponent;
  let fixture: ComponentFixture<SecureSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
