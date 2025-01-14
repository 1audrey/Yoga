import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '@app/models/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  private jsonUrl = 'assets/items.json';

  shopSubMenu = [
    {name: 'All', route: 'shop-all', image:'../../assets/menu/shop-all-yoga-clothes.jpg' },
    {name: 'Men Clothes', route: 'men-clothes', image:'../../assets/menu/shop-men-yoga-clothes.jpg'},
    {name: 'Women Clothes', route: 'shop-all/women', image:'../../assets/menu/shop-women-yoga-clothes.jpg'},
    {name: 'Mats', route:'yoga-mats', image:'../../assets/menu/yoga-mats.jpg'},
    {name: 'Accessories', route:'yoga-accessories', image:'../../assets/menu/yoga-accessories.jpg'},
    {name: 'Vouchers', route: 'vouchers', image:'../../assets/menu/yoga-vouchers.jpg'}]

    getShopMenu(){
      return this.shopSubMenu;
    }

    getItems(): Observable<Item[]> {
       return this.http.get<Item[]>(this.jsonUrl); 
    }

}


