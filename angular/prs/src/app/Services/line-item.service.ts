import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestListComponent } from '../features/request-list/request-list.component';
import { LineItem } from '../models/line-item.model';
import { Request } from '../models/request.model';

const requestRoute = "/line-items"

@Injectable({
  providedIn: 'root'
})
export class LineItemService {

  private url = environment.apiBaseUrl + requestRoute

  constructor(private http: HttpClient) { }


  getAllByRequest(request: Request): Observable<LineItem[]> {
    return this.http.put<LineItem[]>(this.url, request)
  }

  getById(id: number): Observable<LineItem[]> {
    let requestUrl = this.url + '/' + id
    return this.http.get<LineItem[]>(requestUrl)
  }

  // http://localhost:8080/lineItems/
  createLineItem(lineItem: LineItem): Observable<LineItem[]> {
    return this.http.post<LineItem[]>(this.url, lineItem)
  }
  deleteById(id: number): Observable<LineItem[]> {
    let requestUrl = this.url + '/' + id
    return this.http.delete<LineItem[]>(requestUrl)
  }
  //http://localhost:8080/lineItems/{id}
  updateLineItem(lineItem: LineItem): Observable<LineItem[]> {
    let requestUrl = this.url + '/request/lines' + lineItem.id
    return this.http.put<LineItem[]>(requestUrl, lineItem)
  }
}

