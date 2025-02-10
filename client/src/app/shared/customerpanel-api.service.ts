import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomerpanelApiService {
  private readonly _baseUrl = 'http://localhost:8080';
  private _token = '';
  private _user = 0;

  constructor(private http: HttpClient,
              private toastr: ToastrService) { }

  get baseUrl(): string {
    return this._baseUrl;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get user(): number {
    this._user = parseInt(localStorage.getItem('userId') || '0', 10);
    return this._user;
  }

  set user(value: number) {
    this._user = value;
  }

  public logout(): void {
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenTime');
    this.toastr.success('Logout successful');
  }

  public authenticateUser(credentials: any): Observable<any> {
    return this.http.post(`${this._baseUrl}/auth`, credentials);
  }

  public recreateDatabaseTables(): Observable<any> {
    const data = {
      action: 'recreateTables',
      secret: 'Henrik27#!?X'
    }
    return this.http.post(`${this._baseUrl}/settings`, data, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public loadTestData(): Observable<any> {
    const data = {
      test: 'loadTestData'
    }
    return this.http.post(`${this._baseUrl}/test`, data, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public getUserById(id: number): Observable<any> {
    return this.http.get(`${this._baseUrl}/users/byid/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public getAllOffers(): Observable<any> {
    return this.http.get(`${this._baseUrl}/offers`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public getOffers(status: string): Observable<any> {
    return this.http.get(`${this._baseUrl}/offers?status=` + status, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public getOfferById(id: number): Observable<any> {
    return this.http.get(`${this._baseUrl}/offers/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public deleteOffer(id: number): Observable<any> {
    return this.http.delete(`${this._baseUrl}/offers/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public createOffer(offer: any): Observable<any> {
    return this.http.post(`${this._baseUrl}/offers`, offer, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public updateOffer(id: number, offer: any): Observable<any> {
    return this.http.put(`${this._baseUrl}/offers/${id}`, offer, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public changeOfferStatus(id: number, status: any): Observable<any> {
    return this.http.patch(`${this._baseUrl}/offers/${id}/status`, status, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public getCustomers(): Observable<any> {
    return this.http.get(`${this._baseUrl}/customers`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public getCustomerById(id: number): Observable<any> {
    return this.http.get(`${this._baseUrl}/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public createCustomer(customer: any): Observable<any> {
    return this.http.post(`${this._baseUrl}/customers`, customer, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.put(`${this._baseUrl}/customers/${id}`, customer, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this._baseUrl}/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public getDocuments(): Observable<any> {
    return this.http.get(`${this._baseUrl}/documents`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public getDocumentsByOfferId(id: number): Observable<any> {
    return this.http.get(`${this._baseUrl}/documents/offerid/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public getDocumentContent(id: number): Observable<any> {
    return this.http.get(`${this._baseUrl}/documents/content/${id}`, {
      responseType: 'text',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public getDocumentById(id: number): Observable<any> {
    return this.http.get(`${this._baseUrl}/documents/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public deleteDocument(id: number, document: any): Observable<any> {
    return this.http.delete(`${this._baseUrl}/documents/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      body: document
    });
  }

  public createDocument(formData: any): Observable<any> {
    console.log("Creating document");
    return this.http.post(`${this._baseUrl}/documents`, formData, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public addComment(comment: any): Observable<any> {
    return this.http.post(`${this._baseUrl}/comments`, comment, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public getCommentsByOfferId(id: number): Observable<any> {
    return this.http.get(`${this._baseUrl}/comments/offerId/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  public deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this._baseUrl}/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  //Aufgabe 3
  public createTag(tag: any): Observable<any> {
    return this.http.post(`${this._baseUrl}/tags`, tag, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  //Aufgabe 3
  public deleteTag(id: number): Observable<any> {
    return this.http.delete(`${this._baseUrl}/tags/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  //Aufgabe 3
  public getTagsByDocumentId(id: number): Observable<any> {
    return this.http.get(`${this._baseUrl}/tags/documentid/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  //Aufgabe 3
  public processTags(tags: any): Observable<any> {
    const data = {
      tags: tags,
      createdBy: this.user
    }
    return this.http.post(`${this._baseUrl}/tags/process`, data, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  //Aufgabe 3
  public getProcess(processId: number): Observable<any> {
    return this.http.get(`${this._baseUrl}/tags/process/${processId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
}
