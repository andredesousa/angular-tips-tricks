import { forwardRef, ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../value-accessor/value-accessor';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent extends ValueAccessor<boolean> {
  @Input() label: string;

  @Input() isDisabled: boolean;

  @Input() isReadonly: boolean;

  @Output() onChanged = new EventEmitter<boolean>();

  constructor(injector: Injector) {
    super(injector);
  }
}
