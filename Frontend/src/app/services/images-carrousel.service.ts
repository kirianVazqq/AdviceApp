import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesCarrouselService {

  constructor() { }
  images: any = [
    {
      title: 'allianz',
      imgSrc: 'allianz.jpeg',
    },
    {
      title: 'axa',
      imgSrc: 'axa.svg',
    },
    {
      title: 'linea directa',
      imgSrc: 'lineaDirecta.jpg',
    },
    {
      title: 'Mapfre',
      imgSrc: 'mapfre.png',
    },
    {
      title: 'MutuaMadrileña',
      imgSrc: 'mutuaMadrileña.png',
    },
  ];
  getImages(): any[] {
    return this.images;
  }
  filterImages(searchTerm: string): any[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return this.images;
    }
    return this.images.filter((image: { title: string; }) => {
      return image.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}
