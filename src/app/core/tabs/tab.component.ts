import { Component, OnInit, Input } from "@angular/core";
import { TabsGroupComponent } from "./tabs-group.component";

@Component({
    selector: "my-tab",
    template: `
  <div class="panel panel-default" *ngIf="selected">
    <div class="panel-body">
      <ng-content></ng-content>
    </div>
  </div>
  `,
    styles: []
})
export class TabComponent implements OnInit {
    @Input() selected: boolean;
    @Input() title: string;
    constructor(/*tabs: TabsGroupComponent*/) {
        //console.log("REGISTER TAB", this.title);
        //tabs.addTab(this);
    }

    ngOnInit() {
        console.log("TAB", this.title, this.selected);
    }
}
