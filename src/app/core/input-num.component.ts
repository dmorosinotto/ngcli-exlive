import { Component, ElementRef, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "input-num",
  template: `
    <input class="form-control" type="text" [value]="_valueNum" (keydown)="onlyNum($event)" 
        (input)="updNum_notifyChange($event.target.value)" (blur)="_notifyTouched()" >
  `,
  styles: [":host(.ng-invalid) input { border-left: 2px solid red}"],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputNumComponent), multi: true }]
})
export class InputNumComponent implements ControlValueAccessor {
  constructor() {
    this._valueNum = null;
  }

  @Input() allowDec: boolean = true;
  @Input() allowNeg: boolean = true;

  public _valueNum: number | null; //INTERNAL VALUE
  private _notifyChange: (newValue: number) => void; //FUNCTION TO CALL TO NOTIFY WHEN INTERNAL VALUE CHANGE
  private _notifyTouched: () => void; //FUNCTION TO CALL WHEN USER TOUCH (blur) FIELD

  public onlyNum(e: KeyboardEvent) {
    switch (e.key) {
      case "Backspace":
      case "ArrowLeft":
      case "ArrowRight":
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        break; //ALWAYS OK
      case ".":
      case ",":
        if (!this.allowDec || (e.target as HTMLInputElement).value.indexOf(".") >= 0) e.preventDefault();
        break; //ALLOW ONLY IF NOT PRESENT
      case "-":
        if (!this.allowNeg || (e.target as HTMLInputElement).value) e.preventDefault();
        break; //ALLOW ONLY AS FIRST CHAR
      default:
        //console.log(e.key);
        e.preventDefault();
    }
  }

  public updNum_notifyChange(str: string) {
    const num = parseFloat(str.replace(",", "."));
    console.log("input STR:", str, "-> NUM:", num);
    if (isNaN(num)) {
      this._valueNum = null;
    } else {
      this._valueNum = num;
    }
    this._notifyChange(this._valueNum);
  }

  //ControlValueAccessor interface: FUNCTION CALLED WHEN MODEL DATA CHANGES FROM CODE/PARENT BINDING
  public writeValue(objFromModel: any): void {
    const num = parseFloat(objFromModel);
    this._valueNum = isNaN(num) ? null : num;
  }

  //ControlValueAccessor interface: FUNCTION CALLED TO PASS-IN THE FUNCTION USED TO NOTIFY OF INTERNAL VALUE CHANGE
  public registerOnChange(fn: any): void {
    this._notifyChange = fn; //SAVE FUNCTION CALLBACK THAT MUST BE INVOKED WHEN WE CHANGE INTERNAL VALUE
  }

  //ControlValueAccessor interface: FUNCTION CALLED TO PASS-IN THE FUNCTION USED TO NOTIFY PARENT THAT FIELD WAS TOUCHED
  public registerOnTouched(fn: any): void {
    this._notifyTouched = fn; //SAVE FUNCTION CALLBACK THAT MUST BE INVOKED WHEN USER "TOUCH" THE FIELD (blur)
  }

  //ControlValueAccessor interface: FUNCTION CALLED TO Enable/Disable FIELD VALUE - IF NEED TO REFLECT DISABLE STATE TO INTERFACE
  public setDisabledState(isDisabled: boolean): void {
    //throw new Error('Not implemented yet.'); //GENERALLY IT'S OK TO NOT HANDLE THIS!
  }
}
