import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthorService {

  constructor(private _http: Http) { }
  
  createAuthor(name){
    return this._http.post('/api/authors', {name : name}).map(data => data.json()).toPromise();
  }
  getAuthors(){
    return this._http.get('/api/authors').map(data => data.json()).toPromise();
  }
  deleteAuthor(id){
    return this._http.delete(`/api/authors/${id}`).map(data => data.json()).toPromise();
  }
  getAuthorById(id){
    return this._http.get(`/api/authors/${id}`).map(data => data.json()).toPromise();
  }
  updateAuthor(id, name){
    return this._http.put(`/api/authors/${id}`, {name : name}).map(data => data.json()).toPromise();
  }
  getQuotes(id){
    return this._http.get(`/api/quotes/${id}`).map(data => data.json()).toPromise();
  }
  createQuote(quote, id){
    return this._http.post(`/api/quotes`, {quote : quote, id : id}).map(data => data.json()).toPromise();
  }
  deleteQuote(id, authorId){
    return this._http.delete(`/api/quotes/${id}/${authorId}`,).map(data => data.json()).toPromise();
  }
  voteDown(id){
    return this._http.get(`/api/quotes/down/${id}`).map(data => data.json()).toPromise();
  }
  voteUp(id){
    return this._http.get(`/api/quotes/up/${id}`).map(data => data.json()).toPromise();
  }
}