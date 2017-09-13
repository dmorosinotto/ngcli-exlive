import { Component } from '@angular/core';

@Component({
  selector: 'eos-oper',
  templateUrl: './oper.component.html',
  styles: []
})
export class OperComponent {

  readonly opers: Array<(x:number, y:number)=>number>;
  constructor() {
    this.opers = [
      (x,y)=>x+y,
      (x,y)=>x-y,
      (x,y)=>x*y,
      (x,y)=>x/y,
    ]
  }

  calc(op: number, a: string, b: string, $event: MouseEvent) {
    //console.log(op,a,b,$event)
    alert(`RESULT = ${
      this.opers[op](
        parseInt(a,10)||0,
        parseInt(b,10)||0
      )
    }`)
    $event.preventDefault();
  }

}
