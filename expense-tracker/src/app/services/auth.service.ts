import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TokenService } from '../shared/services/token.service';
import { environment } from '../environments/environment';

export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: string | number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/api/auth';
    private commonBaseURL = environment.appConstants.baseApiURL
  

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(data: AuthPayload) {
    return this.http.post<AuthResponse>(this.commonBaseURL+'/Auth/login', data).pipe(
      tap((response) => {
        if (response?.token) {
          this.tokenService.setToken(response.token);
          localStorage.setItem('userId', String(response.userId));
        }
      })
    );
  }

  register(data: AuthPayload) {
    return this.http.post<AuthResponse>(this.commonBaseURL+'/Auth/register', data).pipe(
      tap((response) => {
        if (response?.token) {
          this.tokenService.setToken(response.token);
          localStorage.setItem('userId', String(response.userId));
        }
      })
    );
  }

  logout(): void {
    this.tokenService.removeToken();
    localStorage.removeItem('userId');
  }
}
