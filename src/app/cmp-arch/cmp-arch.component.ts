import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-cmp-arch",
    templateUrl: "./cmp-arch.component.html"
})
export class CmpArchComponent implements OnInit {
    constructor() {}
    public tabsData: Array<{ title: string; text: string }> = [];

    public XXX: string = "DOVE LO METTO QUESTO?";
    ngOnInit() {
        this.tabsData.push({ title: "Simone", text: "ciao" });
        this.tabsData.push({ title: "Pippo", text: "Hello World!" });
        this.tabsData.push({ title: "GUIDO", text: "MOLLAMIIIIII!" });
    }

    deleteGuido() {
        this.tabsData.pop();
    }
}
