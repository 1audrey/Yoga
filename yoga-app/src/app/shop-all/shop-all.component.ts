import { Component } from '@angular/core';
import { ShopService } from '@app/services/shop.service';
import { Item } from '@app/models/item';
import { CartService } from '@app/services/cart-service/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  filteredItems: Item[] = [];
  maxPrice: number = 0;
  selectedColours: string[] = [];
  colours: string[] = [];
  routeType: string = '';

  constructor(private shopService: ShopService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routeType = params['type'] || 'default';
      this.getItems();
    });
    this.getMenus();
    this.filteredItems = this.items;
  }

  toggleDescription() {
    if (this.toggle) {
      this.toggle = false
    } else this.toggle = true;
  }

  addToCart(item: Item) {
    if (item) {
      this.cartService.addItemToCart(item);
      this.router.navigate(['cart']);
    };
  }

  increaseQuantity(item: Item): void { 
    item.desiredQuantity = item.desiredQuantity ?? 0;
    if (item.name.includes('Yoga vouchers')) {
        // Specific logic for 'Yoga vouchers'
        item.desiredQuantity++; 
    } else if (item.quantity !== undefined) { 
        if (item.desiredQuantity < item.quantity) { 
            item.desiredQuantity++; 
        } else if (item.desiredQuantity === item.quantity) {
            this.outOfStock[item.name] = true; 
        }
    }
}

decreaseQuantity(item: Item): void {
    item.desiredQuantity = item.desiredQuantity ?? 0; 
    if (item.name === 'Yoga vouchers') {
        // Specific logic for 'Yoga vouchers'
        if (item.desiredQuantity > 0) { 
            item.desiredQuantity--; 
        }
    } else if (item.desiredQuantity > 0) { 
        item.desiredQuantity--; 
    } 
    if (item.quantity !== undefined && item.desiredQuantity < item.quantity) {
        this.outOfStock[item.name] = false; 
    }
}

  onFilterItemsByPrice({ maxPrice }: { maxPrice: number; }) {
    this.filterItems(maxPrice, this.selectedColours);
  }

  onFilteritemsByColours(colours: string[]) {
    this.selectedColours = colours;
    this.filterItems(this.maxPrice, this.selectedColours);
  }

  private filterItems(maxPrice: number, colours: string[]) {
    this.filteredItems = this.items.filter(item =>
      item.price <= maxPrice &&
      (colours.length === 0 ||
        !item.colour || 
        (item.colour && (colours.includes(item.colour) ||
          (item.colour.includes('/') && colours.includes('multicolour')))))
    );
  }

  private getMenus() {
    const menu = this.shopService.getShopMenu();
    menu.forEach((subMenu) => {
      if (!subMenu.name.includes('All')) {
        this.shopMenu.push(subMenu);
      }
    });
  }

  private getItems() {
    this.shopService.getItems().subscribe(listOfItems => {
      if (this.routeType === 'default') {
        this.items = listOfItems;
      } else {
        this.items = listOfItems.filter(item => item.image?.includes(`shop/${this.routeType}`));
      }
      this.maxPrice = Math.max(...this.items.map(item => item.price));
      this.colours = Array.from(new Set(this.items.map(item => item.colour ? (item.colour.includes('/') ? 'multicolour' : item.colour) : undefined).filter(colour => colour !== undefined))) as string[];
    });
  }
}
