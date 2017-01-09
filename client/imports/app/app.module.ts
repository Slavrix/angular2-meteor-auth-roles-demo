import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AccountsModule } from "angular2-meteor-accounts-ui";
import { AppComponent } from "./app.component";
import { DemoComponent } from "./demo/demo.component";
import { DemoDataService } from "./demo/demo-data.service";


@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    DemoComponent
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
    DemoDataService
  ],
  // Modules
  imports: [
    BrowserModule,
    AccountsModule
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {
  }
}
