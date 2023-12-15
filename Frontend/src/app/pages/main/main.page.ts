import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { jwtDecode } from 'jwt-decode';
import { ImagesCarrouselService } from 'src/app/services/images-carrousel.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(    private storage: Storage,
    private imagesService: ImagesCarrouselService
  ) { }
  userName:string="";
  images: any[] = [];
  slideIndex: number = 0;
  ngOnInit() {
   this.UserName();
   this.images = this.imagesService.getImages();
  }

  previousSlide() {
    this.slideIndex = (this.slideIndex > 0) ? this.slideIndex - 1 : this.images.length - 1;
  }

  nextSlide() {
    this.slideIndex = (this.slideIndex < this.images.length - 1) ? this.slideIndex + 1 : 0;
  }




  async UserName() {
    const token = await this.storage.get('token');
    if (token === null) {
      console.error('Token no encontrado');
      return;
    }
    const decoded = jwtDecode(token) as any; // Aquí estás diciendo que decoded puede ser de cualquier tipo
     this.userName= decoded.username; 
     console.log("Nombre", this.userName);
   
    
  }
}
