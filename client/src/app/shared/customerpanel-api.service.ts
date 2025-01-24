import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerpanelApiService {
  private readonly baseUrl = 'http://localhost:8080';
  private _token = '';
  private _user = 0;

  constructor(private http: HttpClient) { }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get user(): number {
    return this._user;
  }

  set user(value: number) {
    this._user = value;
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

  public createOffer(offer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/offers`, offer, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public getCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/customers`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public getCustomerById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public createCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/customers`, customer, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/customers/${id}`, customer, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
}
