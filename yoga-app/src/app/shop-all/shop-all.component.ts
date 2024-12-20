import { Component } from '@angular/core';
import { ShopService } from '@app/services/shop.service';
import { MatCardModule } from '@angular/material/card';
import { Item } from '@app/models/item';
import { CartService } from '@app/services/cart-service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shop-all',
  templateUrl: './shop-all.component.html',
  styleUrl: './shop-all.component.css'
})
export class ShopAllComponent {
  toggle: boolean = false;
  shopMenu: any = [];
  items: Item[] = [];
  outOfStock: { [key: string]: boolean } = {};

  constructor(private shopService: ShopService, private cartService:CartService, private router: Router){}

  ngOnInit(){
    this.getMenus();
    this.getItems();
  }
  
  toggleDescription(){
    if(this.toggle){
      this.toggle = false
    } else this.toggle = true;
  }

  addToCart(item: Item){
    if (item) {    
      this.cartService.addItemToCart(item);
      this.router.navigate(['cart']);
      };
  }

  increaseQuantity(item: Item): void { 
    item.desiredQuantity = item.desiredQuantity ?? 0;
    if (item.desiredQuantity < item.quantity) { 
      item.desiredQuantity++; 
    } else if (item.desiredQuantity === item.quantity) {
      this.outOfStock[item.name] = true; 
    } 
  }
  
  decreaseQuantity(item: Item): void {
    item.desiredQuantity = item.desiredQuantity ?? 0; 
    if (item.desiredQuantity > 1) { 
      item.desiredQuantity--; 
    } 
    if (item.desiredQuantity < item.quantity) {
       this.outOfStock[item.name] = false; 
    }
  }

  private getMenus(){
    const menu = this.shopService.getShopMenu();
    menu.forEach((subMenu) => {
      if (!subMenu.name.includes('All')){
        this.shopMenu.push(subMenu);
      }
    });
  }
   private getItems() {
    this.shopService.getItems().subscribe(listOfItems => { 
      this.items = listOfItems; 
    });
  }
}
