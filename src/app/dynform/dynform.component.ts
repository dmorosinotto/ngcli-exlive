import { Subscription } from "rxjs/Rx";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators,
    ValidationErrors
} from "@angular/forms";
import { GenCtrlConfig, addConfig } from "./genericomp/GenCtrlConfig";

const validGenre: ValidatorFn = c => {
    switch (String(c.value)
        .trim()
        .toUpperCase()) {
        case "M":
        case "F":
            return null; //VALID -> NULL
        default:
            return { genre: "unknow" };
    }
};

@Component({
    selector: "app-dynform",
    templateUrl: "./dynform.component.html",
    styleUrls: ["./dynform.component.css"]
})
export class DynformComponent implements OnInit, OnDestroy {
    public frm: GenCtrlConfig;
    public ageCtrl: GenCtrlConfig;
    constructor(fb: FormBuilder) {
        this.ageCtrl = addConfig(
            fb.control(null, [Validators.min(1), Validators.max(100)]),
            { label: "Age", type: "number" }
        );
        //TODO: SCARICARE CONFIG DELLA FORM VIA HTTP -> BISOGNA FARSI UNA SERIALIZZAZIONE JSON
        this.frm = addConfig(
            new FormGroup({
                name: new FormControl("Pippo", [
                    Validators.required,
                    Validators.minLength(3)
                ]),
                sex: addConfig(new FormControl("", validGenre), {
                    label: "Genere",
                    type: "radio",
                    optList: [
                        { value: "M", text: "Man" },
                        { value: "F", text: "Woman" },
                        { value: "A", text: "Angel" }
                    ]
                }),
                age: this.ageCtrl,
                married: addConfig(new FormControl(false), {
                    label: "Sposato",
                    type: "check"
                }),
                fabio: addConfig(new FormControl(5, Validators.required), {
                    type: "num"
                }),

                address: addConfig(
                    fb.group({
                        city: [""],
                        prov: addConfig(fb.control(""), {
                            label: "Provincia",
                            type: "combo",
                            optList: [
                                { value: "PD", text: "Padova" },
                                { value: "TV", text: "Treviso" },
                                { value: "VE", text: "Venezia" },
                                { value: "VR", text: "Verona" },
                                { value: "PN", text: "Pordenone" },
                                { value: "BG", text: "Bergamo" }
                            ]
                        }),
                        cap: ["", Validators.pattern("[0-9]{5}")]
                    })
                ),

                phones: fb.array([
                    ["",[Validators.required,Validators.pattern("(328|347|320|333)[0-9]+")]]
                ])
            })
        );
    }

    private _subs: Subscription[];
    public ngOnInit(): void {
        this._subs = [];
        //ESEMPIO DI LOGICA RUNTIME
        this._subs.push(
            this.frm.get("sex").valueChanges.subscribe((s: string) => {
                if (s.toUpperCase() == "F") {
                    this.ageCtrl.options.type = "password";
                } else this.ageCtrl.options.type = "number";
            })
        );
        this._subs.push(
            this.frm.statusChanges.subscribe(v =>
                console.warn("thiForm STATUS", v)
            ),
            this.ageCtrl.statusChanges.subscribe(a =>
                console.info("age STATUS", a)
            )
        );
    }

    public ngOnDestroy(): void {
        //PER EVITARE MEMORY LEAK E' BENE FARE UNSUBSCRIBE
        this._subs.forEach(sub => sub.unsubscribe());
        this._subs = undefined;
    }

    public allErrors(
        ctrl: FormControl | FormArray | FormGroup
    ): ValidationErrors | null {
        if (!ctrl) return undefined;
        if (ctrl.valid) return null;
        if (ctrl instanceof FormControl) return ctrl.errors;
        const keys = Object.keys(ctrl.controls);
        return keys.reduce(
            (err, k) =>
                Object.assign(err, { [k]: this.allErrors(ctrl.get(k) as any) }),
            ctrl.errors || {}
        );
    }
}
