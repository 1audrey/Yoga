import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemAddedSource = new Subject<void>(); 
  itemAdded$ = this.itemAddedSource.asObservable();

  constructor() { }

  addItemToCart(){
    this.itemAddedSource.next();
  }
}
