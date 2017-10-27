import { Component, Input } from "@angular/core";

@Component({
    selector: "my-accordion",
    templateUrl: "./accordion.component.html",
    styleUrls: ["./accordion.component.css"]
})
export class AccordionComponent {
    @Input() color: string = "default";
    @Input() title: string;

    public opened: boolean;
    constructor() {
        this.opened = false;
    }

    public toggle() {
        this.opened = !this.opened;
    }
}
