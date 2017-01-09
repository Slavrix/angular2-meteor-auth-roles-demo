import { Component } from "@angular/core";
import { Meteor } from "meteor/meteor";
import {MeteorComponent} from "angular2-meteor";
import { InjectUser } from "angular2-meteor-accounts-ui";
import template from "./app.component.html";
import style from "./app.component.scss";

@Component({
  selector: "app",
  template,
  styles: [ style ]
})
@InjectUser("user")
export class AppComponent extends MeteorComponent {
  user: Meteor.User;
  constructor() {
    super();
  }
}
