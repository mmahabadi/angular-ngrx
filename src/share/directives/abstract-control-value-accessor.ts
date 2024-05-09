import { ControlValueAccessor } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AbstractControlValueAccessor
  implements ControlValueAccessor
{
  disabled: boolean = false;

  _value: any = '';

  get value() {
    return this._value;
  }

  set value(val) {
    if (val !== undefined && this._value !== val) {
      this._value = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  onChange: any = () => {};

  onTouch: any = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any) {
    this.value = value;
  }
}
