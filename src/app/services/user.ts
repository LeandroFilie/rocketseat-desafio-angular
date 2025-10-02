import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthSuccessResponse } from '../interfaces/auth-success-response';
import { ILoginSuccessResponse } from '../interfaces/login-success-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _httpClient = inject(HttpClient);

  validateUser() {
    return this._httpClient.get<IAuthSuccessResponse>(environment + '/protected');
  }

  login(email: string, password: string) {
    const body = { email, password };

    return this._httpClient.post<ILoginSuccessResponse>(environment + '/users/login', body);
  }
  
}
