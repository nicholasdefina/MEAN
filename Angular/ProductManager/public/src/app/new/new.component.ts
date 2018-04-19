import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  name;  //undetermined name variable
  price;
  message;
  constructor(private _productService:ProductService,
  private _router: Router) { }

  ngOnInit() {
  }

  createProduct(){
    console.log(this.name)
    console.log(this.price)
    this._productService.createProduct(this.name, this.price).then((data=>{
      console.log(data, "this is component data")
      if(data['message']=='success'){
        this._router.navigateByUrl('')
      }
      else
      {
        this.message = "Could not be saved. Please try again."
      }
    }))
  }

  cancel(){
    this._router.navigateByUrl('');
  }

}
