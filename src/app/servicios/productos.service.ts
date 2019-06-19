import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { app } from 'firebase';
import { map } from 'rxjs/operators';
import { reject } from 'q';
import { storage } from 'firebase';


export interface productos {
  id: string,
  cod_barr: string,
  descripcion: string,
  alias: string,
  departamento: string,
  cant_actual: number,
  cant_min: number,
  form_venta: number,
  foto_prod: string,
  precio_costo: number,
  precio_mayoreo: number,
  precio_venta: number,
  marca: string
}

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  constructor(private db: AngularFirestore) { }

  getProducts(){
    return this.db.collection('products').snapshotChanges().pipe(map(prod => {
      return prod.map(a => {
        const data = a.payload.doc.data() as productos;
        data.id = a.payload.doc.id
        return data
      })
    }))
  
  }

  register(nombre: string, marca: string, codigo: string,
    alias: string, departamento: string, imagen: string, precosto: number,
    preventa: number, premayor: number, cantactual: number,
    cantminima: number, imageData: any){

    // this.guardaFoto(imageData);
    return new Promise((resolve, reject) => {
      this.db.collection('products').add({
        descripcion: nombre,
        marca: marca,
        cod_barr: codigo,
        alias: alias,
        departamento: departamento,
        // form_venta: formavta,
        foto_prod: imagen,
        precio_costo: precosto,
        precio_venta: preventa,
        precio_mayoreo: premayor,
        cant_actual: cantactual,
        cant_min: cantminima
      }).then ( res => {
        resolve(res);
      }).catch( err => {
        reject(err);
      });
    });
  }

  guardaFoto(imageData: any) {
    console.log('imagen: ' + imageData);
    const im = 'data:image/jpeg;base64,${result}';
    const selfieRef = storage().ref('pictures/sugerencias');
    selfieRef.putString(imageData, 'base64', {contentType: 'image/png'});
    console.log('direccion: ' + selfieRef.getDownloadURL);
  }
}