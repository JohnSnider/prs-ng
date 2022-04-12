import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  loggedInUser?: User = undefined


  constructor() { }
}
