import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _productService: ProductService) { }

  products;
  ngOnInit() {
    this._productService.getProducts().then(data =>{
      this.products = data['products']
    })
  }

  delete(id){
    this._productService.deleteProduct(id).then(data=>{
      if(data['status']=='success'){
        this.products = data['products']
      }
    })
  }




}
