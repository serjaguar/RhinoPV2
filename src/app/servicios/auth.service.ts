import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { resolve, reject } from 'q';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public UserId: string;

  constructor(private AFauth: AngularFireAuth, private router : Router,
              private db: AngularFirestore) { }

  login(email:string, password:string){

    return new Promise((resolve,rejected) => {
      // email = email +"@rhinopv.com";
      this.AFauth.auth.signInWithEmailAndPassword(email,password).then(user => {
        console.log("UserId: " + user.user.uid)
        this.UserId = user.user.uid;
        resolve(user);
      }).catch(err => rejected(err));

    })

  }

  logout(){
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })  
  }

  register(nombre: string, apepate: string, apemate: string,
           genero: string, puesto: string, email: string,
           celular: number, negocio: string, callen: string,
           colonia: string, mundidele: string, estado: string,
           cp: number, telefono: number, tipnego: string,
           usuario: string, password: string){
    
    return new Promise((resolve,reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(usuario,password).then ( res => {
        // console.log(res.user.uid);

        const uid = res.user.uid;

        this.db.collection('users').doc(uid).set({
          uid : uid,
          nombre : nombre,
          apepate : apepate,
          apemate : apemate,
          genero : genero,
          puesto : puesto,
          email : email,
          celular : celular,
          negocio : negocio,
          callen : callen,
          colonia : colonia,
          mundidele : mundidele,
          estado : estado,
          cp : cp,
          telefono : telefono,
          tipnego  : tipnego
        })
        this.UserId = res.user.uid;
        resolve(res)
      }).catch(err => reject(err))
    })

  }

  recuperaContra(email: string){
    // return new Promise((resolve,rejected) => {
    //   this.AFauth.auth.sendPasswordResetEmail(email).then(res =>{
    //     resolve(res);
    //   }).catch(err => rejected(err));

    // })

    return this.AFauth.auth.sendPasswordResetEmail(email);

  }

}
