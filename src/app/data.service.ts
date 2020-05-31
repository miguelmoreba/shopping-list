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
      'Collecyion-id': '5eb9dcf847a2266b1476e84e'
    }
  }

  constructor(private readonly httpService: HttpClient) { }

  postItem(data: any): Observable<any> {
    const url = 'https://api.jsonbin.io/b/5eb9dcf847a2266b1476e84e';
    return this.httpService.put(url, data, this.requestOptions);
  }

  getItems(): Observable<any> {
    const url = 'https://api.jsonbin.io/b/5eb9dcf847a2266b1476e84e/latest'
    return this.httpService.get(url, this.requestOptions);
  }
}
