import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {FormsModule} from '@angular/forms' //needed for ngmodel binding?
import { ProductService } from './product.service';
import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewComponent,
    EditComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule //needed for ngmodel binding?
  ],
  providers: [ProductService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
