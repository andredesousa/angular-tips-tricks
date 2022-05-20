import { ChangeDetectorRef, Injector } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export class ValueAccessor<T> implements ControlValueAccessor {
  private privateValue: T;

  private readonly changeDetector: ChangeDetectorRef;

  constructor(injector: Injector) {
    this.changeDetector = injector.get(ChangeDetectorRef);
  }

  public get value(): T {
    return this.privateValue;
  }

  public set value(value: T) {
    this.privateValue = value;
    this.propagateChange(this.value);
  }

  /**
   * Write a new value to the element.
   */
  public writeValue(value: T): void {
    this.privateValue = value;
    this.changeDetector.detectChanges();
  }

  /**
   * Set the function to be called when the control receives a change event.
   */
  public registerOnChange(fn: (_: T) => void): void {
    this.propagateChange = fn;
  }

  /**
   * Set the function to be called when the control receives a touch event.
   */
  public registerOnTouched(_: (_: T) => void): void {
    /**/
  }

  private propagateChange: (_: any) => void = (_?: any) => {
    /**/
  };
}
