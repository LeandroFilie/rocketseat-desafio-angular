import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products';
import { INewProductRequest } from '../../interfaces/new-product.request';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css'
})
export class NewProduct {
  private readonly _productsService = inject(ProductsService);
  private readonly _router = inject(Router);

  productImageBase64 = '';
  successMessage = '';

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if(input?.files && input.files.length > 0) {
      const file = input.files[0];

      this.convertFileToBase64(file);
    }
  }

  private convertFileToBase64(file: File) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageBase64 = e.target?.result as string;
      this.productImageBase64 = imageBase64;
    };

    reader.onerror = (_) => {
      this.productImageBase64 = '';
    };

    reader.readAsDataURL(file);
  }

  save() {
    if(this.productForm.invalid || !this.productImageBase64) {
      return;
    }

    const newProdutct: INewProductRequest = {
      title: this.productForm.value.title as string,
      price: this.productForm.value.price as number,
      description: this.productForm.value.description as string,
      category: this.productForm.value.category as string,
      imageBase64: this.productImageBase64,
    }

    this._productsService.saveProduct(newProdutct)
    .pipe(take(1))
    .subscribe({
      next: (response) => {
        this.successMessage = response.message;
      },
    });
  }

  cancel() {
    this._router.navigate(['/products']);
  }

}
