import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(
    private http: HttpClient
  ) { }

  getTextFile(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }

  send(uri: string, method: RequestType = RequestType.GET, payload: any = null) {
    return new Promise((res, rej) => {
      // var reqBodyLength = payload.toString().length;
      var httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        })
      };



      switch (method) {
        case RequestType.GET:
          this.http.get(uri, httpOptions)
            .subscribe(async (body: any) => {

              if (body.status == 'success' && body.data) {
                res(body);
              } else {
                rej('invalid result')
              }
            });
          break;

        case RequestType.POST:
          this.http.post(uri, JSON.stringify(payload), httpOptions)
            .subscribe(async (body: any) => {

              if (body.status == 'success' && body.data) {
                res(body);
              } else {
                rej('invalid result')
              }
            });

          break;
      }
    })
  }
}

export enum RequestType {
  GET = 'GET',
  POST = 'POST'
}
