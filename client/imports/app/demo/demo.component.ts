import { Component} from "@angular/core";
import { Meteor } from "meteor/meteor";
import {MeteorComponent} from "angular2-meteor";
import { Observable } from "rxjs";
import { InjectUser } from "angular2-meteor-accounts-ui";
import { DemoDataService } from "./demo-data.service";
import { Demo } from "../../../../both/models/demo.model";
import template from "./demo.component.html";
import style from "./demo.component.scss";

@Component({
  selector: "demo",
  template,
  styles: [ style ]
})
@InjectUser("user")
export class DemoComponent extends MeteorComponent {
  greeting: string;
  // data: Observable<Demo[]>;
  user: Meteor.User;

  constructor(
    // private demoDataService: DemoDataService
    ) {
    super();
    this.greeting = "Hello";
  }

  ngOnInit() {}

  checkRoles(role) {
    return Roles.userIsInRole(this.user, role);
  }
}
