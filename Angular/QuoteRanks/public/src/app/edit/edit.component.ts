import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { AuthorService } from '../author.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id;
  author;
  name;
  message
  constructor(
    private _authorService : AuthorService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    this._authorService.getAuthorById(this.id).then(data => {
      if(data['status'] == 'success'){
        this.author = data['author']
        this.name = data['author']['name']
      }
      else{
        this._router.navigateByUrl('')
      }
    })
  }

  update(){
 
    this._authorService.updateAuthor(this.id, this.name).then(data => {
      if(data['status'] == 'success'){
        this._router.navigateByUrl('')
      }
      else{
        this.message = "something went wrong"
      }
    })
  }

}