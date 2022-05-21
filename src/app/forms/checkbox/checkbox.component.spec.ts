import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ngMocks } from 'ng-mocks';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CheckboxComponent],
    });

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
  });

  it('should be in disable state', () => {
    component.isDisabled = true;
    fixture.detectChanges();

    const mockedDirectiveInstance = ngMocks.get(fixture.debugElement.query(By.directive(NgModel)), NgModel);

    expect(mockedDirectiveInstance.isDisabled).toBeTrue();
  });
});
