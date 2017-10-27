import { Http } from "@angular/http";
import { Component, OnInit } from "@angular/core";
import {
    AbstractControl,
    AsyncValidatorFn,
    FormBuilder,
    FormControl,
    FormGroup,
    FormArray,
    ValidationErrors,
    Validator,
    ValidatorFn,
    Validators
} from "@angular/forms";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/observable/of";

const BASEURL_PROV = "http://localhost:3000/prov";

@Component({
    selector: "eos-contact",
    templateUrl: "./contact.component.html",
    styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
    public frm: FormGroup;
    public sexCtrl: FormControl;
    private validGenre: ValidatorFn;
    private validProv: AsyncValidatorFn;

    constructor(private fb: FormBuilder, private http: Http) {
        this.validProv = c => {
            if (!c.value) return Observable.of(null);
            return this.http
                .get(BASEURL_PROV + "/" + c.value)
                .map(res => res.json())
                .map(() => null) //OK ESISTE PROV --> Validator=NULL
                .catch(err => Observable.of({ prov: "not found" }))
                .delay(2000);
        };

        this.validGenre = c => {
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
    }

    ngOnInit() {
        this.sexCtrl = new FormControl("", this.validGenre);
        this.frm = new FormGroup({
                name: new FormControl("Pippo", [
                    Validators.required,
                    Validators.minLength(3)
                ]),
                sex: this.sexCtrl,
                age: this.fb.control(null, [Validators.min(1), Validators.max(100)]),
                fabio: new FormControl(5,Validators.required),
                address: this.fb.group({
                    city: [""],
                    prov: ["", , this.validProv],
                    cap: ["", Validators.pattern("[0-9]{5}")]
                }),
                phones: this.fb.array([
                    ["",[Validators.required,Validators.pattern("(328|347|320|333)[0-9]+")]]
                ])
            });
        //LETTURA PROVINCE DA HTTP json-server --> POPOLO OPTION CON *NgFor e | async
        this.prov$ = this.http.get(BASEURL_PROV).map(res => res.json());

        //LOGICA RUNTIME SUBSCRIBE -> GESTISCO CAMBIO DATI
        this.sexCtrl.valueChanges.subscribe(x =>
            console.log("VALORE ATTUALE", x)
        );

        this.frm.get("address.cap") //POSSO ARRIVARE A QUALSIASI CAMPO DELLA FORM
            .valueChanges.debounceTime(500)
            .filter((x: string) => +x % 2 == 0)
            .subscribe(cap => console.log("CAP", cap));
        
        //LOGICA RUNTIME VISUALIZZA CAMBIO STATO FORM
        this.frm.statusChanges.subscribe(s => console.log("STATUS", s));
    }
    public prov$: Observable<string>;

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

    public onlyNum(e: KeyboardEvent) {
        if (e.code === "Backspace") return;
        if (e.key < "0" || e.key > "9") e.preventDefault();
    }

    private get phonesArr(): FormArray {
        return this.frm.get("phones") as FormArray;
    }

    public addPhone() {
        this.phonesArr.push(
            new FormControl(
                "",
                Validators.compose([
                    Validators.required,
                    Validators.pattern("3(28|47|20|33)[0-9]+")
                ])
            )
        );
    }

    public DOSOMETHING() {
        this.frm.reset({ name: "PLUTO" });
        //this.frm.setValue()
        this.frm.patchValue({ name: "STEFANO" });
        //this.frm.get("name").setValue()
    }

    public removePhone(idx) {
        this.phonesArr.removeAt(idx);
    }
}
