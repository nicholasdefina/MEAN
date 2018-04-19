import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id;
  product;
  name;
  price;
  message;

  constructor(
    private _productService : ProductService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.id = params['id']);
    this._productService.getProductById(this.id).then(data => {
      if(data['status'] == 'success'){
        this.product = data['product']  
        this.name = data['product']['name']
        this.price = data['product']['price']
      }
      else{
        this._router.navigateByUrl('')
      }
    })
  }

  update(){
 
    this._productService.updateProduct(this.id, this.name, this.price).then(data => {
      if(data['status'] == 'success'){
        this._router.navigateByUrl('')
      }
      else{
        console.log(data)
        this.message = "something went wrong"
      }
    })
  }

  cancel(){
    this._router.navigateByUrl('');
  }

}