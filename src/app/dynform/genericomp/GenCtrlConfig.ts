import { FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
import { AbstractControl } from "@angular/forms";

export interface GenCtrlOptions {
    label?: string;
    type: "text" | "number" | "password" | "check" | "radio" | "combo" | "num";
    optList?: Array<{ value: any; text: string }>;
}

const _defaultCtrlOptions: GenCtrlOptions = {
    type: "text"
};

export type GenCtrlConfig = AbstractControl & {
    options: GenCtrlOptions;
};

export function addConfig(
    ctrl: AbstractControl,
    options: GenCtrlOptions = _defaultCtrlOptions
): GenCtrlConfig {
    //let gc = ctrl as GenCtrlConfig; gc.options = options; return gc;
    return Object.assign(ctrl, { options }); // Attach options to AbstractControl
}

export function isControl(ctrl: AbstractControl | any): ctrl is FormControl {
    return ctrl instanceof FormControl || !ctrl.controls;
}

export function isGroup(ctrl: AbstractControl | any): ctrl is FormGroup {
    return ctrl instanceof FormGroup || !Array.isArray(ctrl.controls);
}

export function isArray(ctrl: AbstractControl | any): ctrl is FormArray {
    return ctrl instanceof FormArray || Array.isArray(ctrl.controls);
}

export function hasConfig(ctrl: AbstractControl | any): ctrl is GenCtrlConfig {
    return ctrl.hasOwnProperty("options") && typeof ctrl.options === "object";
}

export function getConfig(ctrl: AbstractControl): GenCtrlOptions {
    if (hasConfig(ctrl)) return ctrl.options;
    else return _defaultCtrlOptions;
}
