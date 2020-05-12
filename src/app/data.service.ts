import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Secret-key': '$2b$10$YMex2SD7OxoCHvaVxN2bpOATI3DlmoNQRPeTBMr6rJ4zg.egEpZmG',
      'Collecyion-id': '5eb869fa47a2266b14763f6b'
    }
  }

  constructor(private readonly httpService: HttpClient) { }

  postItem(data: any): Observable<any> {
    const url = 'https://api.jsonbin.io/b';
    return this.httpService.post(url, data, this.requestOptions);
  }

  getItems(): Observable<any> {
    const url = 'https://api.jsonbin.io/b/5eb9bdea8284f36af7b98912/latest'
    return this.httpService.get(url, this.requestOptions);
  }
}
