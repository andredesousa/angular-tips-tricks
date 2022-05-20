import { forwardRef, ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../value-accessor/value-accessor';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true,
    },
  ],
})
export class RadioButtonComponent<T> extends ValueAccessor<T> {
  @Input() isDisabled: boolean;

  @Input() isReadonly: boolean;

  @Input() option: T;

  @Input() label: string;

  @Input() message: string;

  @Input() groupName: string;

  @Output() onChanged = new EventEmitter<T>();

  constructor(injector: Injector) {
    super(injector);
  }
}
