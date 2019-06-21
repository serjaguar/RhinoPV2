import { Component, OnInit } from '@angular/core';
import { ProductosService,productos } from '../../servicios/productos.service';
import { ModalController } from '@ionic/angular';
import { DetainvenComponent } from '../../componentes/detainven/detainven.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  public product: any = [];

  constructor(public productosService: ProductosService,
              private modal: ModalController
  ) { }

  ngOnInit() {
    this.productosService.getProducts().subscribe( prod =>{
      this.product = prod;
    })
  }

  openInventario(prod){
    console.log('Si entra antes del error: ' + this.product[1]);
    this.modal.create({
      component: DetainvenComponent,
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

}
