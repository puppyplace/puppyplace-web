import { TestBed } from '@angular/core/testing';

import { CategoryManagerService } from './category-manager.service';

describe('CategoryServiceService', () => {
  let service: CategoryManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
