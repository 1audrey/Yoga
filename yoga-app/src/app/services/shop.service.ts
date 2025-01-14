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
    {name: 'Men Clothes', route: 'shop-all/men', image:'../../assets/menu/shop-men-yoga-clothes.jpg'},
    {name: 'Women Clothes', route: 'shop-all/women', image:'../../assets/menu/shop-women-yoga-clothes.jpg'},
    {name: 'Mats', route:'shop-all/yoga-mats', image:'../../assets/menu/yoga-mats.jpg'},
    {name: 'Accessories', route:'shop-all/yoga-accessories', image:'../../assets/menu/yoga-accessories.jpg'},
    {name: 'Vouchers', route: 'shop-all/yoga-vouchers', image:'../../assets/menu/yoga-vouchers.jpg'}]

    getShopMenu(){
      return this.shopSubMenu;
    }

    getItems(): Observable<Item[]> {
       return this.http.get<Item[]>(this.jsonUrl); 
    }

}


