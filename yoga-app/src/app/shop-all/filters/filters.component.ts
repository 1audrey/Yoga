import { Component, EventEmitter, Input, Output, signal, SimpleChanges } from '@angular/core';


@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  readonly panelOpenState = signal(false);
  sliderValue!: number;
  allColours: string[] = [];
  filteredColours: string[] = [];
  selectedChips: Set<string> = new Set<string>();

  @Input() maxPrice!: number;
  @Input() colours!: string[];

  @Output() filterItems = new EventEmitter<number>();
  @Output() filterColours = new EventEmitter<string[]>();

  constructor(){
    this.formatLabel = this.formatLabel.bind(this);
  }

  ngOnInit() {
    this.sliderValue = this.maxPrice;
    this.allColours = this.colours;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['maxPrice'] && changes['maxPrice'].currentValue !== undefined) {
      this.sliderValue = this.maxPrice;
      this.filterItems.emit(this.sliderValue);
    }
    //add a chip to handle multicolor
    if (changes['colours'] && changes['colours'].currentValue !== undefined) {
      this.allColours = this.colours;
      this.filterColours.emit(this.allColours);
    }
  }

  formatLabel(value: number): string {
    return `£${value}`;
  }

  onSliderChange(value: number | null): void {
    if (value !== null) {
      this.sliderValue = value;
      this.filterItems.emit(this.sliderValue);
    }
  }

  selectColour(colour: string) {
    if (this.selectedChips.has(colour)) {
      this.selectedChips.delete(colour);
    } else {
      this.selectedChips.add(colour);
    }
    this.filterColours.emit(Array.from(this.selectedChips));
  }

  isSelected(colour: string): boolean {
    return this.selectedChips.has(colour);
  }

  handleKeydown(event: KeyboardEvent, colour: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.selectColour(colour);
      event.preventDefault();
    }
  }

}
