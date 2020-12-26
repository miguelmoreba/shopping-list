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
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  }

  constructor(private readonly httpService: HttpClient) { }

  postItem(data: any): Observable<any> {
    const url = `https://bubba-lists-api.herokuapp.com/`;

    return this.httpService.put(url, data, this.requestOptions);
  }

  getItems(): Observable<any> {
    const url = `https://bubba-lists-api.herokuapp.com/`;

    return this.httpService.get(url, this.requestOptions);
  }
}
