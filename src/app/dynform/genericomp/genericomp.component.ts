import { AbstractControl } from "@angular/forms";
import { GenCtrlConfig, GenCtrlOptions, getConfig, isArray, isControl } from "./GenCtrlConfig";
import { Component, Input } from "@angular/core";

@Component({
    selector: "generic-ctrl",
    templateUrl: "./genericomp.component.html"
})
export class GeneriCtrlComponent {
    constructor() {}

    @Input() ctrl: GenCtrlConfig;
    @Input() name: string;

    get options(): GenCtrlOptions {
        //return ctrl.options;
        return getConfig(this.ctrl);
    }

    hasChild() {
        return !isControl(this.ctrl);
    }

    get childs(): string[] {
        let names = Object.keys((this.ctrl as any).controls);
        console.log("CHILDS", names);
        return Object.keys((this.ctrl as any).controls);
    }

    get isArr() {
        //return isArray(this.ctrl);
        return Array.isArray((this.ctrl as any).controls);
    }

    add() {
        if (isArray(this.ctrl) && this.ctrl.length > 0) {
            //TODO: DeepClone della AbstractControl + ControlConfig di 0!
            this.ctrl.push(this.ctrl.at(0)); //COSI' HO PROB DI REFERENCE
        }
    }

    del() {
        if (isArray(this.ctrl) && this.ctrl.length > 1) {
            this.ctrl.removeAt(this.ctrl.length - 1);
        }
    }
}
