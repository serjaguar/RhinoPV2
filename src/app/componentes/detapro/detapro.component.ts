import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-detapro',
  templateUrl: './detapro.component.html',
  styleUrls: ['./detapro.component.scss'],
})
export class DetaproComponent implements OnInit {

  image: any;
  detalproForm: FormGroup;


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
  



  constructor(private modal: ModalController,
              private formBuilder: FormBuilder,
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
      ])),
      cantactual: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      cantminima: new FormControl('', Validators.compose([
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

  }

  closeChat() {
    this.modal.dismiss()
  }

  onSubmit(){
    console.log("Este es el chingon")
  }

}
