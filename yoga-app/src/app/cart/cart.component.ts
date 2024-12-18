import { Component } from '@angular/core';
import { Item } from '../models/item';
import { CartService } from '../services/cart-service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  itemCount!: number;
  itemsInCart: Item[] = [];
  totalPriceInCart: number = 0;
  orderIsProcessing: boolean = false;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.itemsInCart = this.cartService.getItemsFromTheCart();
    this.itemsInCart.forEach((item) => {
      this.totalPriceInCart += item.price;
    });
  }

  payItems() {
    this.router.navigate(['thank-you'])
    .then(() => {
      setTimeout(() => {
        const thankYouBanner = document.getElementById('thank-you-banner');
        if (thankYouBanner) {
          thankYouBanner.focus();
          thankYouBanner.setAttribute('aria-live', 'assertive');
        }
      },
        0);
    });
    this.deteleItems();
  }

  deteleItems(){
    this.cartService.deleteItems();
  }
}
