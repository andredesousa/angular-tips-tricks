import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ngMocks } from 'ng-mocks';

import { RadioButtonComponent } from './radio-button.component';

describe('RadioButtonComponent', () => {
  let component: RadioButtonComponent<string>;
  let fixture: ComponentFixture<RadioButtonComponent<string>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [RadioButtonComponent],
    });

    fixture = TestBed.createComponent<RadioButtonComponent<string>>(RadioButtonComponent);
    component = fixture.componentInstance;
  });

  it('should be in disable state', () => {
    component.isDisabled = true;
    fixture.detectChanges();

    const mockedDirectiveInstance = ngMocks.get(fixture.debugElement.query(By.directive(NgModel)), NgModel);

    expect(mockedDirectiveInstance.isDisabled).toBeTrue();
  });
});
