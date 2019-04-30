import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  foto: any;
  image:any=''
  constructor(private camera: Camera) {}

  ngOnInit() {
  }

  hacerFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 100,
      targetHeight: 100,
      allowEdit : true,
      saveToPhotoAlbum: true
    }
    this.camera.getPicture(options).then((imageData) => {
      this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
      console.log(err);
    });
  }
  
}
