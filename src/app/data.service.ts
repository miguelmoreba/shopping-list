import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Secret-key': environment.SECRET_KEY,
      'Collection-id': environment.COLLECTION_ID
    }
  }

  constructor(private readonly httpService: HttpClient) { }

  postItem(data: any): Observable<any> {
    const url = `https://api.jsonbin.io/b/${environment.COLLECTION_ID}`;
    return this.httpService.put(url, data, this.requestOptions);
  }

  getItems(): Observable<any> {
    const url = `https://api.jsonbin.io/b/${environment.COLLECTION_ID}/latest`
    return this.httpService.get(url, this.requestOptions);
  }
}
