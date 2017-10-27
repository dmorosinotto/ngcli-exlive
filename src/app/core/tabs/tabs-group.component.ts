import {
    Component,
    Input,
    OnInit,
    ContentChildren,
    QueryList,
    AfterContentInit
} from "@angular/core";
import { TabComponent } from "./tab.component";

@Component({
    selector: "tabs-group",
    templateUrl: "./tabs-group.component.html",
    styles: []
})
export class TabsGroupComponent implements OnInit, AfterContentInit {
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
    //tabs: TabComponent[] = [];
    constructor() {}

    @Input() vert: boolean;

    ngOnInit() {
        console.log("TABS INIT", this.tabs);
        if (this.tabs && this.tabs.length) this.select(this.tabs[0]);
    }

    ngAfterContentInit() {
        console.log("QueryList TABS IS AVAILABLE HERE", this.tabs);
        //this.select(this.tabs.first);
    }
    /*
    addTab(tab: TabComponent) {
        this.tabs.push(tab);
    }
    */
    select(tab: TabComponent) {
        this.tabs.forEach(t => (t.selected = t === tab));
    }
}
