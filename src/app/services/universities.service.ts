import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { University } from '../interfaces/university';
import { Observable } from 'rxjs';
import { Helper } from '../shared/helper';

@Injectable({
  providedIn: 'root',
})
export class UniversitiesService {
  readonly baseUrl: Required<string> = `${environment.baseUrl}/search`;

  constructor(private _http: HttpClient) {}

  getData(fileteParams: any): Observable<University[]> {
    const params = Helper.extractParamas(fileteParams);
    return this._http.get<University[]>(this.baseUrl, { params: params })
  }

}
