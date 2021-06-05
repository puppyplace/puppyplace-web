import { TestBed } from '@angular/core/testing';

import { ProductManagerService } from './product-manager.service';

describe('ProductService', () => {
  let service: ProductManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
