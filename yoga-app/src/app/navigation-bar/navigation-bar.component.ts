import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart-service/cart.service';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})

export class NavigationBarComponent {
  isShopMenuOpen = false;
  shopSubMenu = [
    {name: 'All', route: 'shop-all'},
    {name: 'Men Clothes', route: 'men-clothes'},
    {name: 'Female Clothes', route: 'women-clothes'},
    {name: 'Mats', route:'yoga-mats'},
    {name: 'Accessories', route:'yoga-accessories'},
    {name: 'Vouchers', route: 'vouchers'}]

    itemCount: number = 0;
    subscription!: Subscription;

    constructor(private cartService: CartService){ }

  ngOnInit() { 
    this.subscription = this.cartService.itemAdded$.subscribe(() => {
      this.itemCount++;
      }); 
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

