import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private api = 'https://mailthis.to/betta7635';

  constructor(private http: HttpClient) { }

  postMessage(input: any) {
    return this.http.post(this.api, input, { responseType: 'text' }).pipe(
      map(
        (response) => {
          if (response) {
            return response;
          }
        },
        (error: any) => {
          return error;
        }
      )
    )
  }
}
