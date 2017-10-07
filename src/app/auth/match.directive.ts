import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { AbstractControl, ValidationErrors, Validator, ValidatorFn, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

export function MatchValidator(ctrl1: string, ctrl2: string): ValidatorFn {
  console.log("MATCH",ctrl1,ctrl2)
  return (c: AbstractControl) => {
    let c1=c.get(ctrl1);
    let c2=c.get(ctrl2);
    if (c1 && c2 && c1.value === c2.value) return null
    else return { 'match': true }
  }
}

@Directive({
  selector: '[ctrl-match]',
  providers: [{provide: NG_VALIDATORS, useExisting: MatchDirective, multi:true}]
})
export class MatchDirective implements Validator {
  private _valFn: ValidatorFn;  
  constructor() { 
    this._valFn = undefined;
  }
  
  @Input('ctrl-match') set match(value: string) {
    if (!value) console.error("You must specifiy match controls name separted by ':'");
    let ctrls = String(value).split(':');
    if (!ctrls[0]) console.error("You must specify 1st control name");
    if (!ctrls[1]) console.error("You must specify 2nd control name");
    this._valFn = MatchValidator(ctrls[0], ctrls[1]);
  }
  
  validate(c: AbstractControl): ValidationErrors | null {
    if (this._valFn) return this._valFn(c);
    else return null;
  }
  
}
