import { Component, OnInit } from '@angular/core';
import { ProductosService,productos } from "../../servicios/productos.service";
import { ModalController } from "@ionic/angular";
import { DetaproComponent } from "../../componentes/detapro/detapro.component";
import { AltaproComponent } from "../../componentes/altapro/altapro.component";


@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  public product: any = [];

  constructor(public productosService: ProductosService,
              private modal: ModalController) { }

  ngOnInit() {
    this.productosService.getProducts().subscribe( prod =>{
      this.product = prod;
    })
  }

  openProducts(prod){
    console.log('Si entra antes del error: ' + this.product[1]);
    this.modal.create({
      component: DetaproComponent,
      componentProps : {
        marca : prod.marca,
        alias: prod.alias,
        nombre: prod.descripcion,
        cant_actual: prod.cant_actual,
        cant_min: prod.cant_min,
        cod_barr: prod.cod_barr,
        departamento: prod.departamento,
        foto: prod.foto_prod,
        precio_costo: prod.precio_costo,
        precio_mayoreo: prod.precio_mayoreo,
        precio_venta: prod.precio_venta,
        tipventa: prod.tipventa,
        id: prod.id
      }
    }).then ( (modal) => modal.present())
  }

  openAltProd(){
    this.modal.create({
      component: AltaproComponent
    }).then ( (modal) => modal.present())
  }

}
