import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProductosService } from '../../servicios/productos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detainven',
  templateUrl: './detainven.component.html',
  styleUrls: ['./detainven.component.scss'],
})
export class DetainvenComponent implements OnInit {

  image: any;
  img: any;

  tipo_prod: string;

  detinvenForm: FormGroup;

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

  constructor(private modal: ModalController,
              private formBuilder: FormBuilder,
              private productsService: ProductosService,
              private alertController: AlertController,
              private navparams: NavParams) {

    this.detinvenForm = this.formBuilder.group({
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
      ])),
      cantact: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      cantmin: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });
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

  closeModal() {
    this.modal.dismiss();
  }

  actualizaProducto(){
    this.presentAlertUpdate();
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

  guardaCambios(){
    console.log('Nombre: ' + this.detinvenForm.value.nombre);

    if (this.nombre !== this.detinvenForm.value.nombre)
    {
      this.nombre = this.detinvenForm.value.nombre;
    }

    if (this.marca !== this.detinvenForm.value.marca)
    {
      this.marca = this.detinvenForm.value.marca;
    }

    if (this.cod_barr !== this.detinvenForm.value.codigo)
    {
      this.cod_barr = this.detinvenForm.value.codigo;
    }

    if (this.tipventa !== this.tipo_prod)
    {
      this.tipventa = this.tipo_prod;
    }

    if (this.alias !== this.detinvenForm.value.alias)
    {
      this.alias = this.detinvenForm.value.alias;
    }

    if (this.departamento !== this.detinvenForm.value.departamento)
    {
      this.departamento = this.detinvenForm.value.departamento;
    }

    if (this.foto !== this.image)
    {
      this.foto = this.image;
    }

    if (this.precio_costo !== this.detinvenForm.value.precosto)
    {
      this.precio_costo = this.detinvenForm.value.precosto;
    }

    if (this.precio_venta !== this.detinvenForm.value.preventa)
    {
      this.precio_venta = this.detinvenForm.value.preventa;
    }

    if (this.precio_mayoreo !== this.detinvenForm.value.premayor)
    {
      this.precio_mayoreo = this.detinvenForm.value.premayor;
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

  async presentAlert(errores: string) {
    const alert = await this.alertController.create({
      header: 'Rhino PV',
      cssClass: 'login-alert',
      message: errores,
      buttons: ['OK']
    });
    await alert.present();
  }


}
