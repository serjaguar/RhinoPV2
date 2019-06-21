import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detainven',
  templateUrl: './detainven.component.html',
  styleUrls: ['./detainven.component.scss'],
})
export class DetainvenComponent implements OnInit {

  image: any;
  img: any;

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
              private navparams: NavParams) { }

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
  }

  closeModal() {
    this.modal.dismiss();
  }

}
