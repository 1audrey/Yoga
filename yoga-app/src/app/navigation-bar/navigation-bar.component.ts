import { Component } from '@angular/core';

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

  toggleSubMenu(){
    if(this.isShopMenuOpen){
      this.isShopMenuOpen = false
    } else this.isShopMenuOpen = true;
  }
}

