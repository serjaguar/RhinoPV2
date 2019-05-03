import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { app } from 'firebase';
import { map } from 'rxjs/operators';


export interface productos{
  id: string
  cod_barr: string
  descripcion: string
  alias: string
  departamento: string
  cant_actual: number
  cant_min: number
  form_venta: number
  foto_prod: string
  precio_costo: number
  precio_mayoreo: number
  precio_venta: number
  marca: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private db: AngularFirestore) { }

  getProducts(){
    return this.db.collection("products").snapshotChanges().pipe(map(prod => {
      return prod.map(a => {
        const data = a.payload.doc.data() as productos;
        data.id = a.payload.doc.id
        return data
      })
    }))
  
  }
}