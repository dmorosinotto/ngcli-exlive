import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "alert-dumb",
    template: `
  <div class="alert alert-dismissible" [ngClass]="'alert-'+color" role="alert">
    <button type="button" class="close" aria-label="Close" (click)="closeMe.emit()">
      <span aria-hidden="true">&times;</span>
    </button>
    <strong>{{title}}</strong> {{message}}.
  </div>
  `
})
export class AlertDumbComponent {
    constructor() {
        this.color = "warning";
    }

    @Input() color: string;
    @Input() title: string;
    @Input() message: string;
    @Output() closeMe = new EventEmitter();
}
