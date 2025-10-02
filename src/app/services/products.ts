import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { INewProductRequest } from '../interfaces/new-product.request';
import { INewProdutctResponse } from '../interfaces/new-product-response';
import { IProductsResponse } from '../interfaces/products-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    private readonly _httpClient = inject(HttpClient);

    saveProduct(product: INewProductRequest) {
      return this._httpClient.post<INewProdutctResponse>(environment + '/products', product)
    }

    getProducts() {
      return this._httpClient.get<IProductsResponse>(environment + '/products');
    }
  
}
