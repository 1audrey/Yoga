import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart-service/cart.service';
import { ShopService } from '@app/services/shop.service';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})

export class NavigationBarComponent {
  isShopMenuOpen = false;
  shopSubMenu: any = [];

    itemCount: number = 0;
    subscription!: Subscription;

    constructor(private cartService: CartService, private shopService: ShopService){ }

  ngOnInit() { 
    this.subscription = this.cartService.itemAdded$.subscribe(() => {
      this.itemCount = this.cartService.getItemsFromTheCart().length;
      }); 
    this.shopSubMenu = this.shopService.getShopMenu();
   } 
   
   ngOnDestroy() { 
    if(this.subscription){
      this.subscription.unsubscribe(); 
    }
   }

  toggleSubMenu(){
    if(this.isShopMenuOpen){
      this.isShopMenuOpen = false
    } else this.isShopMenuOpen = true;
  }
}

