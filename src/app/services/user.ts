import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthSuccessResponse } from '../interfaces/auth-success-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _httpClient = inject(HttpClient);

  validateUser() {
    return this._httpClient.get<IAuthSuccessResponse>('http://localhost:3000/api/protected');
  }
  
}
