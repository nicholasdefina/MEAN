import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { AuthorService } from '../author.service';  //author service acts as model

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  id;
  quotes;
  author;
  constructor(
    private _authorService : AuthorService,
    private _router : Router,
    private _route : ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    this._authorService.getQuotes(this.id).then(data => {
      this.quotes = data['author']['quotes']
      this.author = data['author']['name']
    })
  }
  delete(id){
    this._authorService.deleteQuote(id, this.id).then(data => {
      console.log(data)
      this.quotes = data['author']['quotes']
    })
  }
  voteDown(id){
    this._authorService.voteDown(id).then(data => {
      console.log("votedown works")
      this.quotes = data["author"]["quotes"]
    })
  }
  voteUp(id){
    this._authorService.voteUp(id).then(data => {
      this.quotes = data['author']['quotes']
    })
  }

}