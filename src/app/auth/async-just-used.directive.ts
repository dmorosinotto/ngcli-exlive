import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { AuthService } from './auth.service';
@Directive({
  selector: '[asyncJustUsed]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: AsyncJustUsedDirective, multi:true }]
})
export class AsyncJustUsedDirective implements AsyncValidator {

  constructor(private auth: AuthService) { }

  public validate(c: AbstractControl): Promise<ValidationErrors | null> {
      if (!c.value) return Promise.resolve(null);
      return this.auth.justUsed(c.value)
                 .then(used => used ?  { justused: true} : null ); 
  }
}
