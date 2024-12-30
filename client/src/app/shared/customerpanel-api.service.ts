import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerpanelApiService {
  private readonly baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getOffers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/offers`);
  }
}
