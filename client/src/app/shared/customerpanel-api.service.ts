import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerpanelApiService {
  private readonly baseUrl = 'http://localhost:8080';
  private _token = '';

  constructor(private http: HttpClient) { }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  public authenticateUser(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth`, credentials);
  }

  public getOffers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/offers`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public getOfferById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/offers/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
}
