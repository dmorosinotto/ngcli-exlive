import { NotifyService } from "./core/notify/notify.service";
import { Route, RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { OperComponent } from "./oper/oper.component";
import { EchoComponent } from "./echo/echo.component";
import { ChatComponent } from "./chat/chat.component";
import { AjaxComponent } from "./ajax/ajax.component";
import { LoginComponent } from "./login/login.component";
import { SigninComponent } from "./signin/signin.component";
import { MatchDirective } from "./core/match.directive";
import { AsyncJustUsedDirective } from "./core/async-just-used.directive";
import { AuthService } from "./core/auth.service";
import { ContactComponent } from "./contact/contact.component";
import { InputNumComponent } from "./core/input-num.component";
import { DynformComponent } from "./dynform/dynform.component";
import { GeneriCtrlComponent } from "./dynform/genericomp/genericomp.component";
import { TabComponent } from "./core/tabs/tab.component";
import { TabsGroupComponent } from "./core/tabs/tabs-group.component";
import { CmpArchComponent } from "./cmp-arch/cmp-arch.component";
import { AccordionComponent } from "./core/accordion/accordion.component";
import { AlertDumbComponent } from "./core/notify/alert-dumb.component";
import { NotifyContainerComponent } from "./core/notify/notify-container.component";

const ROUTES: Route[] = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "oper", component: OperComponent },
    { path: "echo", component: EchoComponent },
    { path: "chat", component: ChatComponent },
    { path: "login", component: LoginComponent },
    { path: "signin", component: SigninComponent },
    { path: "contact", component: ContactComponent },
    { path: "dynform", component: DynformComponent },
    { path: "cmparch", component: CmpArchComponent },
    { path: "ajax", component: AjaxComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        OperComponent,
        EchoComponent,
        ChatComponent,
        AjaxComponent,
        LoginComponent,
        SigninComponent,
        MatchDirective,
        AsyncJustUsedDirective,
        ContactComponent,
        InputNumComponent,
        DynformComponent,
        GeneriCtrlComponent,
        TabComponent,
        TabsGroupComponent,
        AccordionComponent,
        CmpArchComponent,
        AlertDumbComponent,
        NotifyContainerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers: [AuthService, NotifyService],
    bootstrap: [AppComponent]
})
export class AppModule {}
