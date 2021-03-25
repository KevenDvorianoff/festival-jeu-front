import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Editeurs {
    id: Number;
    name: String;
    address: String;
    isPubliher: Boolean;
    isActive: Boolean;
}

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  editeursUrl = 'http://localhost:3000/company'

  getEditeurs() {
        return this.http.get(this.editeursUrl);
  }


}