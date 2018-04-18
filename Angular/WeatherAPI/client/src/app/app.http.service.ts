console.log( "******** http.service.ts ******** " );

import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

import { api_keys } from "7ed369ce258fa860bf0b40c039dbd96b"

@Injectable()
export class HttpService {

  constructor( private _http: HttpClient ) {
    // this.get_seattle;
  }