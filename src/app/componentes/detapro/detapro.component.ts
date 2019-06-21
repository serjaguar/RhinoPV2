import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProductosService } from '../../servicios/productos.service';
import { AlertController } from '@ionic/angular';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-detapro',
  templateUrl: './detapro.component.html',
  styleUrls: ['./detapro.component.scss'],
})
export class DetaproComponent implements OnInit {

  image: any;
  img: any;
  detalproForm: FormGroup;
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  codigo: string;

  public marca: string;
  public alias: string;
  public nombre: string;
  public cant_actual: number;
  public cant_min: number;
  public cod_barr: string;
  public departamento: string;
  public foto: string;
  public precio_costo: number;
  public precio_mayoreo: number;
  public precio_venta: number;
  public tipventa: string;
  public id: string;

  tipo_prod: string;

  defaultSelectedRadio = 'radio_2';
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem:any;
 
  radio_list = [
    {
      id: '1',
      name: 'radio_list',
      value: '1',
      text: 'Por Unidad/Pza',
      disabled: false,
      checked: false,
      color: 'amafue'
    }, {
      id: '2',
      name: 'radio_list',
      value: '2',
      text: 'A Granel (Usa decimales)',
      disabled: false,
      checked: false,
      color: 'amafue'
    }, {
      id: '3',
      name: 'radio_list',
      value: '3',
      text: 'Como paquete (kit)',
      disabled: false,
      checked: false,
      color: 'amafue'
    },
  ];

  constructor(private modal: ModalController,
              private camera: Camera,
              private formBuilder: FormBuilder,
              private productsService: ProductosService,
              private alertController: AlertController,
              private barcodeScanner: BarcodeScanner,
              private navparams: NavParams) { 
    this.detalproForm = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([
        Validators.required
      ])),
      marca: new FormControl('', Validators.compose([
        Validators.required
      ])),
      codigo: new FormControl('', Validators.compose([
        Validators.required
      ])),
      tipventa: new FormControl('', Validators.compose([
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
      ]))
    });

    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Rhino PV',
      cssClass: 'login-alert',
      message: '¿Desea eliminar el producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            console.log('Confirm Okay');
            this.productsService.removeProducts(this.id).then(res => {
              this.presentAlert('Se elimino el registro correctamente');
              this.modal.dismiss();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertUpdate() {
    const alert = await this.alertController.create({
      header: 'Rhino PV',
      cssClass: 'login-alert',
      message: '¿¿Desea guardar cambios?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            console.log('Confirm Okay');
            this.guardaCambios();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(errores: string) {
    const alert = await this.alertController.create({
      header: 'Rhino PV',
      cssClass: 'login-alert',
      message: errores,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {

    this.marca = this.navparams.get('marca');
    this.alias = this.navparams.get('alias');
    this.nombre = this.navparams.get('nombre');
    this.cant_actual = this.navparams.get('cant_actual');
    this.cant_min = this.navparams.get('cant_min');
    this.cod_barr = this.navparams.get('cod_barr');
    this.departamento = this.navparams.get('departamento');
    this.foto = this.navparams.get('foto');
    this.precio_costo = this.navparams.get('precio_costo');
    this.precio_mayoreo = this.navparams.get('precio_mayoreo');
    this.precio_venta = this.navparams.get('precio_venta');
    this.tipventa = this.navparams.get('tipventa');
    this.image = this.foto;
    this.id = this.navparams.get('id');

    if(this.tipventa === '1') {
      console.log('entra 1');
      this.tipo_prod = '1';
    } else if(this.tipventa === '2') {
      console.log('entra 2');
      this.tipo_prod = '2';
    } else {
      console.log('entra 3');
      this.tipo_prod = '3';
    }
  }

  closeChat() {
    this.modal.dismiss();
  }

  eliminaProducto(){
    this.presentAlertConfirm();
  }

  actualizaProducto(){
    this.presentAlertUpdate();
  }

  guardaCambios(){
    console.log('Nombre: ' + this.detalproForm.value.nombre);

    if (this.nombre !== this.detalproForm.value.nombre)
    {
      this.nombre = this.detalproForm.value.nombre;
    }

    if (this.marca !== this.detalproForm.value.marca)
    {
      this.marca = this.detalproForm.value.marca;
    }

    if (this.cod_barr !== this.detalproForm.value.codigo)
    {
      this.cod_barr = this.detalproForm.value.codigo;
    }

    if (this.tipventa !== this.tipo_prod)
    {
      this.tipventa = this.tipo_prod;
    }

    if (this.alias !== this.detalproForm.value.alias)
    {
      this.alias = this.detalproForm.value.alias;
    }

    if (this.departamento !== this.detalproForm.value.departamento)
    {
      this.departamento = this.detalproForm.value.departamento;
    }

    if (this.foto !== this.image)
    {
      this.foto = this.image;
    }

    if (this.precio_costo !== this.detalproForm.value.precosto)
    {
      this.precio_costo = this.detalproForm.value.precosto;
    }

    if (this.precio_venta !== this.detalproForm.value.preventa)
    {
      this.precio_venta = this.detalproForm.value.preventa;
    }

    if (this.precio_mayoreo !== this.detalproForm.value.premayor)
    {
      this.precio_mayoreo = this.detalproForm.value.premayor;
    }

    console.log(this.nombre         );
    console.log(this.marca          );
    console.log(this.cod_barr       );
    console.log(this.tipventa       );
    console.log(this.alias          );
    console.log(this.departamento   );
    console.log(this.foto           );
    console.log(this.precio_costo   );
    console.log(this.precio_venta   );
    console.log(this.precio_mayoreo );
    console.log(this.cant_actual    );
    console.log(this.cant_min       );
    console.log(this.id             );
    this.productsService.updateProducts(
      this.nombre,
      this.marca,
      this.cod_barr,
      this.tipventa,
      this.alias,
      this.departamento,
      this.foto,
      this.precio_costo,
      this.precio_venta,
      this.precio_mayoreo,
      this.cant_actual,
      this.cant_min,
      this.id
    ).then(res => {
      this.presentAlert('Se actualizo el registro correctamente');
      this.modal.dismiss();
    }).catch ( err => {
      this.presentAlert('Error al actualizar el registro' + err);
    });
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

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
        // alert('Barcode data ' + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
        // this.codigo = barcodeData.text;


      }).catch(err => {
        console.log('Error', err);
      });
  }

  radioGroupChange(event) {
    console.log('radioGroupChange',event.detail);
    this.selectedRadioGroup = event.detail;
  }
 
  radioFocus() {
    console.log('radioFocus');
  }
  radioSelect(event) {
    console.log('radioSelect',event.detail);
    console.log('radioSelect',event.detail.value);
    this.tipo_prod = event.detail.value;
    this.selectedRadioItem = event.detail;
  }
  radioBlur() {
    console.log('radioBlur');
  }

}
