import { Component } from '@angular/core';
import { Item } from '../models/item';
import { CartService } from '../services/cart-service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
    itemCount!: number;
    itemsInCart: Item[] = [];
    totalPriceInCart: number = 0;

    constructor(private cartService : CartService){}

    ngOnInit(){
      this.itemsInCart = this.cartService.getItemsFromTheCart();
      this.itemsInCart.forEach((item) => {
        this.totalPriceInCart += item.price; 
      });
    }

    payItems(){
      console.log('Items paid')
    }
}
