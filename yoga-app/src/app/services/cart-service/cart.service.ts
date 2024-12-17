import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../../models/item';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemAddedSource = new Subject<void>(); 
  itemAdded$ = this.itemAddedSource.asObservable();
  itemsInTheCart: Item[] = [];

  constructor() { }

  addItemToCart(item: Item){
    this.itemsInTheCart.push(item);
    this.itemAddedSource.next();
  }

  getItemsFromTheCart(): Item[] {
    return this.itemsInTheCart;
  }
}
