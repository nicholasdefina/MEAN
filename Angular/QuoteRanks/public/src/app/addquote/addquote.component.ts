import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-addquote',
  templateUrl: './addquote.component.html',
  styleUrls: ['./addquote.component.css']
})
export class AddquoteComponent implements OnInit {
  id;
  author;
  quote;
  message;
  constructor(
    private _authorService : AuthorService,
    private _router : Router,
    private _route : ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    this._authorService.getAuthorById(this.id).then(data => {
      this.author = data['author']['name']
    })
  }
  addQuote(){
    this._authorService.createQuote(this.quote, this.id).then(data =>{
      if(data['status'] == 'success'){
        this._router.navigateByUrl(`/viewQuotes/${this.id}`)
      }
      else{
        this.message = "something went wrong"
      }
    })
  }

}