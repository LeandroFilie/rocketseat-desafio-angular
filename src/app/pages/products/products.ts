import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products';
import { take } from 'rxjs';
import { IProductsResponse } from '../../interfaces/products-response';
import { IProductResponse } from '../../interfaces/product-response';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  private readonly _productService = inject(ProductsService);

  products: IProductResponse[] = [];

  ngOnInit() {
    this._productService.getProducts()
    .pipe(take(1))
    .subscribe({
      next: (response) => {
        this.products = response?.data || [];
      },
    })
  }

}
