import { Component, OnInit } from '@angular/core';

import {
  ActivatedRoute,
  Params,
  Router
} from "@angular/router";

import { HttpService } from "./http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Weather Checking Thing';
}
