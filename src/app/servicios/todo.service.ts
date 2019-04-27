import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class TodoService {



  constructor(private db: AngularFirestore) {}

  getTodo(){
    return this.db.collection("users").snapshotChanges();
  }

  getUno( datos_id : string){
    return this.db.collection('users').doc(datos_id).valueChanges()
  }
}
