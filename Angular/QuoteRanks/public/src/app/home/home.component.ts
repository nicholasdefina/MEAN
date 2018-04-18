import { Component, OnInit } from '@angular/core';
import { AuthorService} from '../author.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _authorService: AuthorService) { }

  authors; //undefined variable type
  ngOnInit() {
    this._authorService.getAuthors().then(data =>{
      this.authors = data['authors']
    })
  }

  delete(id){
    this._authorService.deleteAuthor(id).then(data => {
      if(data['status'] =='success'){
        this.authors = data['authors']
      }
      
    })
  }

}
