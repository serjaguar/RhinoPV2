import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ModalController } from "@ionic/angular";
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-altapro',
  templateUrl: './altapro.component.html',
  styleUrls: ['./altapro.component.scss'],
})
      
export class AltaproComponent implements OnInit {

  image: any;
  altproForm: FormGroup;
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  codigo: string;


  constructor(
    private camera: Camera,
    public formBuilder: FormBuilder,
    private modal: ModalController,
    private barcodeScanner: BarcodeScanner
  ) {

    this.altproForm = this.formBuilder.group({
      nombre: new FormControl('',Validators.compose([
        Validators.required
      ])),
      marca: new FormControl('',Validators.compose([
        Validators.required
      ])),
      codigo: new FormControl('Hola',Validators.compose([
        Validators.required
      ])),
      alias: new FormControl('',Validators.compose([
        Validators.required
      ])),
      departamento: new FormControl('',Validators.compose([
        Validators.required
      ])),
      precosto: new FormControl('',Validators.compose([
        Validators.required,
      ])),
      preventa: new FormControl('',Validators.compose([
        Validators.required,
      ])),
      premayor: new FormControl('',Validators.compose([
        Validators.required,
      ])),
      cantactual: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      cantminima: new FormControl('',Validators.compose([
        Validators.required,
      ]))
    });

    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };

   }

  ngOnInit() {
    this.image="assets/imagenes/foto_1.png"
  }

  hacerFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // targetWidth: 100,
      // targetHeight: 100,
      allowEdit : true,
      saveToPhotoAlbum: true
    }
    this.camera.getPicture(options).then((imageData) => {
      this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
      console.log(err);
    });
  }

  valores(){
    console.log(this.altproForm.value.nombre);
    console.log(this.altproForm.value.marca);
    console.log(this.altproForm.value.codigo);
    console.log(this.altproForm.value.alias);
    console.log(this.altproForm.value.departamento);
    console.log("foto: " + this.image);
    console.log(this.altproForm.value.precosto);
    console.log(this.altproForm.value.preventa);
    console.log(this.altproForm.value.premayor);
    console.log(this.altproForm.value.cantactual);
    console.log(this.altproForm.value.cantminima);
  }

  closeChat() {
    this.modal.dismiss()
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
        alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
        // this.codigo = barcodeData.text;


      }).catch(err => {
        console.log("Error", err);
      });
  }

}
