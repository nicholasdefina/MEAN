import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { QuotesComponent } from './quotes/quotes.component';
import { AddquoteComponent } from './addquote/addquote.component';


const routes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'new', component : NewComponent},
  {path: 'edit/:id', component : EditComponent},
  {path: 'viewQuotes/:id', component : QuotesComponent},
  {path: 'addQuote/:id', component : AddquoteComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }