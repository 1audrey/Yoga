import { Component, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction} from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { CartService } from '../services/cart-service/cart.service';
import { Item } from '../models/item';

@Component({
  selector: 'book-classes',
  templateUrl: './book-classes.component.html',
  styleUrls: ['./book-classes.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BookClassesComponent {
  selectedDate!: Date;

  constructor( private router: Router, private cartService: CartService) { }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const day = cellDate.getDay();
      // 0 = Sunday, 1 = Monday, ..., 3 = Wednesday, ..., 6 = Saturday
      return day === 3 || day === 6 ? 'example-custom-date-class' : '';
    }
    return '';
  };

  dateFilter(date: Date | null): boolean {
    if (!date) {
      return false;

    }
    const day = date.getDay();
    return day === 3 || day === 6;
  }

  addToCart() {
     if (this.selectedDate) {
      let item: Item = {
        name: `Class on the ${this.selectedDate.toLocaleDateString()}`,
        price: 10,
        quantity: 1,
        desiredQuantity: 1
      };
      
      this.cartService.addItemToCart(item);
      this.router.navigate(['cart']);
      } else return;
    
  }
}
