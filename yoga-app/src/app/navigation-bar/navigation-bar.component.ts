import { Component } from '@angular/core';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})

export class NavigationBarComponent {
  isShopMenuOpen = false;
  shopSubMenu = ['All','Men Clothes', 'Female Clothes', 'Mats', 'Accessories', 'Vouchers']

  toggleSubMenu(){
    if(this.isShopMenuOpen){
      this.isShopMenuOpen = false
    } else this.isShopMenuOpen = true;
  }
}

