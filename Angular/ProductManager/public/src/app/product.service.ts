import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  constructor(private _http: Http) { }
  
  createProduct(name, price){
    console.log("at the service")
    return this._http.post('/api/products', {name : name, price : price}).map(data => data.json()).toPromise();
  }
  getProducts(){
    return this._http.get('/api/products').map(data => data.json()).toPromise();
  }
  deleteProduct(id){
    return this._http.delete(`/api/products/${id}`).map(data => data.json()).toPromise();
  }
  getProductById(id){
    return this._http.get(`/api/products/${id}`).map(data => data.json()).toPromise();
  }
  updateProduct(id, name, price){
    console.log("at the service for updateProduct")
    return this._http.put(`/api/products/${id}`, {name : name, price:price}).map(data => data.json()).toPromise();
  }
}