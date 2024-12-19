import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShopService } from './shop.service';

describe('ShopService', () => {
  let service: ShopService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ShopService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => { 
    httpMock.verify(); 
   });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the shop menu', () => {
    expect(service.getShopMenu()).toEqual(service.shopSubMenu);
  });

  it('should fetch items from the JSON file', () => { 
    const mockItems = [{
      name: "Yoga legging pink", 
      price: 40, 
      quantity: 20, 
      image: "../../assets/shop/women/woman-pink-set.jpg"},
    ]; 

      service.getItems().subscribe(items => {
         expect(items).toEqual(mockItems); 
      }); 
      
      const req = httpMock.expectOne('assets/items.json'); 
      expect(req.request.method).toBe('GET'); 
      req.flush(mockItems); });
});
