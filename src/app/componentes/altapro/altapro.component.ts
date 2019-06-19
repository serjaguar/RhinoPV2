import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ModalController } from '@ionic/angular';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ProductosService } from '../../servicios/productos.service';
import { AlertController } from '@ionic/angular';


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
  img: any;

  constructor(
    private camera: Camera,
    public formBuilder: FormBuilder,
    private modal: ModalController,
    private barcodeScanner: BarcodeScanner,
    private productsService: ProductosService,
    public alertController: AlertController
  ) {

    this.altproForm = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([
        Validators.required
      ])),
      marca: new FormControl('', Validators.compose([
        Validators.required
      ])),
      codigo: new FormControl('', Validators.compose([
        Validators.required
      ])),
      alias: new FormControl('', Validators.compose([
        Validators.required
      ])),
      departamento: new FormControl('', Validators.compose([
        Validators.required
      ])),
      precosto: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      preventa: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      premayor: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      cantactual: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      cantminima: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });

    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };

   }

  async presentAlert(errores: string) {
    const alert = await this.alertController.create({
      header: 'Rhino PV',
      // subHeader: 'Problemas al iniciar la sesion',
      cssClass: 'login-alert',
      message: errores,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    this.image = 'assets/imagenes/foto_1.png'
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
      this.img = imageData;
    }, (err) => {
      console.log(err);
    });
  }

  addProducts(){
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

    this.productsService.register(
      this.altproForm.value.nombre,
      this.altproForm.value.marca,
      this.altproForm.value.codigo,
      this.altproForm.value.alias,
      this.altproForm.value.departamento,
      this.image,
      this.altproForm.value.precosto,
      this.altproForm.value.preventa,
      this.altproForm.value.premayor,
      this.altproForm.value.cantactual,
      this.altproForm.value.cantminima,
      this.img
    ).then( pro => {
      console.log('Respuesta: ' + pro)
      this.presentAlert('Producto registrado correctamente');
      this.closeChat();
    }).catch( err => {
      console.log('Error: ' + err);
      this.presentAlert('Error al registrar el producto');
    })
  }

  closeChat() {
    this.modal.dismiss()
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
        // alert('Barcode data ' + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
        // this.codigo = barcodeData.text;


      }).catch(err => {
        console.log('Error', err);
      });
  }

}
