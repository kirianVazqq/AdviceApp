import { TestBed } from '@angular/core/testing';

import { ImagesCarrouselService } from './images-carrousel.service';

describe('ImagesCarrouselService', () => {
  let service: ImagesCarrouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesCarrouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
