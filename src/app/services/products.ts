import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { INewProductRequest } from '../interfaces/new-product.request';
import { INewProdutctResponse } from '../interfaces/new-product-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    private readonly _httpClient = inject(HttpClient);

    saveProduct(product: INewProductRequest) {
      return this._httpClient.post<INewProdutctResponse>('http://localhost:3000/api/products', product)
    }
  
}
