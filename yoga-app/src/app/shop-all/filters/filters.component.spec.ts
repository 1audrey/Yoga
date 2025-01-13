import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersComponent } from './filters.component';
import { By } from '@angular/platform-browser';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';


describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      imports: [MatExpansionModule, BrowserAnimationsModule, MatSliderModule, MatChipsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heading h3 not visible', () => {
    const h3 = fixture.debugElement.query(By.css('.visually-hidden')).nativeElement;
    expect(h3).toBeDefined();
    expect(h3.innerText).toEqual('Filter products')
  });

  it('should have a filter by price section', () => {
    const filterByPrice = fixture.debugElement.query(By.css('.price-filter')).nativeElement;

    expect(filterByPrice).toBeDefined();
    expect(filterByPrice.innerText).toEqual('Filter by price');
    expect(filterByPrice.getAttribute('aria-label')).toEqual('Filter by price');
    expect(filterByPrice.getAttribute('tabindex')).toEqual('0');
  });

  it('should have a filter by colour section', () => {
    const filterByPrice = fixture.debugElement.query(By.css('.colour-filter')).nativeElement;

    expect(filterByPrice).toBeDefined();
    expect(filterByPrice.innerText).toEqual('Filter by colour');
    expect(filterByPrice.getAttribute('aria-label')).toEqual('Filter by colour');
    expect(filterByPrice.getAttribute('tabindex')).toEqual('0');
  });

  it('should have a list of colour option', () => {
    component.allColours = ['pink'];

    const filterByColours = fixture.debugElement.query(By.css('.colour-filter')).nativeElement;
    filterByColours.click();
    fixture.detectChanges();

    const colourSelection = fixture.debugElement.query(By.css('.colour-selection')).nativeElement;

    expect(colourSelection).toBeDefined();
    expect(colourSelection.getAttribute('aria-label')).toEqual('Colour selection');
    expect(colourSelection.getAttribute('role')).toEqual('listbox');
  });

  it('should get all the colours from the items', () => {
    component.colours = ['red', 'pink'];

    component.ngOnInit();

    expect(component.allColours.length).toEqual(2);
  });

  it('should have the colours visible', () => {
    component.colours = ['red', 'pink'];

    component.ngOnInit();
    fixture.detectChanges();

    const colours = fixture.debugElement.queryAll(By.css('.colour-chip'));

    expect(colours.length).toEqual(component.colours.length);
    expect(colours[0].nativeElement.getAttribute('aria-label')).toEqual(component.colours[0]);
    expect(colours[0].nativeElement.getAttribute('role')).toEqual('option');
  });

  it('should have a multicolour ship if a multicolour item is available', () => {
    component.colours = ['multicolour'];

    component.ngOnInit();
    fixture.detectChanges();

    const multicolour = fixture.debugElement.queryAll(By.css('.multicolour'));

    expect(multicolour).toBeDefined();
  });

  it('should add a colour to filteredColours if it does not exist', () => {
    const colour = 'red';
    spyOn(component.filterColours, 'emit');
  
    component.selectColour(colour);
  
    expect(component.selectedChips.has(colour)).toBeTrue();
    expect(component.filterColours.emit).toHaveBeenCalledWith([colour]);
  });

  it('should remove a colour from filteredColours if it already exists', () => {
    const colour = 'red';
    component.selectedChips.add(colour);
    spyOn(component.filterColours, 'emit');
  
    component.selectColour(colour);
  
    expect(component.selectedChips.has(colour)).toBeFalse();
    expect(component.filterColours.emit).toHaveBeenCalledWith([]);
  });

  it('should highlight that a colour is selected or not the user', () => {
    component.allColours = ['red'];
    fixture.detectChanges();
  
    let colourChip = fixture.debugElement.query(By.css('.colour-chip')).nativeElement;
    colourChip.click();
    fixture.detectChanges();
  
    let selectedChip = fixture.debugElement.query(By.css('.selected-chip'));
    expect(selectedChip).toBeDefined();
  
    colourChip.click();
    fixture.detectChanges();
  
    selectedChip = fixture.debugElement.query(By.css('.selected-chip'));
    expect(selectedChip).toBeNull();
  });

  it('should call selectColour and preventDefault when Enter key is pressed', () => {
    const colour = 'red';
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(component, 'selectColour');
    spyOn(event, 'preventDefault');

    component.handleKeydown(event, colour);

    expect(component.selectColour).toHaveBeenCalledWith(colour);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should have a slider for the price', () => {
    component.maxPrice = 50;

    component.ngOnInit();
    fixture.detectChanges();
    const slider = fixture.debugElement.query(By.css('mat-slider')).nativeElement;

    expect(slider).toBeDefined();
    expect(slider.getAttribute('aria-label')).toEqual('Price slider');
    expect(slider.getAttribute('aria-valuemin')).toEqual('0');
    expect(slider.getAttribute('ng-reflect-max')).toEqual('50');
    expect(slider.getAttribute('ng-reflect-value')).toEqual('50');   
  });

  it('should format the slider value', () => {  
    const value = 45;

    component.onSliderChange(value);

    expect(component.sliderValue).toEqual(value);
  });

  it('should emit the slider value when set', () => {
    const spy = spyOn(component.filterItems, 'emit');

    component.onSliderChange(50);

    expect(spy).toHaveBeenCalledWith(50);
  });

  it('should initialise the slider value as the max price', () => {
    component.maxPrice = 50;

    component.ngOnInit();

    expect(component.sliderValue).toEqual(50);
  });

  it('should update sliderValue and emit filterItems when the slider is changed', () => {
    component.maxPrice = 100;
    const changes: SimpleChanges = {
      maxPrice: {
        currentValue: 100,
        previousValue: 50,
        firstChange: false,
        isFirstChange: () => false
      }
    };

    spyOn(component.filterItems, 'emit'); 

    component.ngOnChanges(changes);

    expect(component.sliderValue).toBe(100);
    expect(component.filterItems.emit).toHaveBeenCalledWith(100);
  });

  it('should bind formatLabel method in the constructor', () => {
    const boundMethod = component.formatLabel;
    expect(boundMethod).toBe(component.formatLabel);
  });

  it('should update the colours when the filter is changed', () => {
    component.colours = ['red', 'blue', 'green'];
    const spy = spyOn(component.filterColours, 'emit');

    const changes: SimpleChanges = {
      colours: new SimpleChange(undefined, ['red', 'blue', 'green'], false)
    };

    spyOn(component.filterItems, 'emit'); 

    component.ngOnChanges(changes);

    expect(component.allColours).toEqual(['red', 'blue', 'green']);
    expect(spy).toHaveBeenCalledOnceWith(['red', 'blue', 'green']);
  });
});
