import { Component, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction} from '@angular/material/datepicker';

@Component({
  selector: 'book-classes',
  templateUrl: './book-classes.component.html',
  styleUrls: ['./book-classes.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BookClassesComponent {
  selectedDate!: Date;

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
      console.log('Selected Date:', this.selectedDate);
      } else { console.log('No date selected');
    }
  }
}
