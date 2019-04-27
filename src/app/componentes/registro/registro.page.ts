import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from "../../servicios/auth.service";
import { auth } from 'firebase';
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre:string;
  sexo:string;
  registroForm: FormGroup;

  error_messages = {
    'nombre': [
      {type: 'required', message: 'El campo nombre es obligatorio.'}
    ],
    'apepate': [
      {type: 'required', message: 'El campo Apellido paterno es obligatorio.'}
    ],
    'apemate': [
      {type: 'required', message: 'El campo Apellido materno es obligatorio.'}
    ],
    'genero': [
      {type: 'required', message: 'El campo género es obligatorio.'}
    ],
    'puesto': [
      {type: 'required', message: 'El campo puesto es obligatorio.'}
    ],
    'email': [
      {type: 'required', message: 'El campo email es obligatorio.'},
      {type: 'pattern', message: 'Escriba un formato de e-mail valido.'}
    ],
    'celular': [
      {type: 'required', message: 'El campo celular es obligatorio.'},
      {type: 'pattern', message: 'Solo se permiten números en este campo.'}
    ],
    'negocio': [
      {type: 'required', message: 'El campo nombre del negocio es obligatorio.'}
    ],
    'callen': [
      {type: 'required', message: 'El campo calle y numero es obligatorio.'}
    ],
    'colinia': [
      {type: 'required', message: 'El campo colonia es obligatorio.'}
    ],
    'municipio': [
      {type: 'required', message: 'El campo municipio / delegación es obligatorio.'}
    ],
    'estado': [
      {type: 'required', message: 'El campo estado es obligatorio.'}
    ],
    'cpostal': [
      {type: 'required', message: 'El campo código postal es obligatorio.'},
      {type: 'minLength', message: 'Longitud no válida para el código postal.'},
      {type: 'pattern', message: 'Solo se permiten números en este campo.'}
    ],
    'telefono': [
      {type: 'required', message: 'El campo teléfono es obligatorio.'},
      {type: 'pattern', message: 'Solo se permiten números en este campo.'}
    ],
    'tipnego': [
      {type: 'required', message: 'El campo tipo de negocio es obligatorio.'}
    ],
    'usuario': [
      {type: 'required', message: 'El campo usuario es obligatorio.'}
    ],
    'password': [
      {type: 'required', message: 'El campo contraseña es obligatorio.'}
    ],
  }

  sexos: string [] = [
    "Femenino" ,
    "Masculino"
  ];

  puestos: string [] =[
    "Propietado",
    "Gerente"
  ]

  tipos: string [] =[
    "Negocio 1",
    "Negocio 2",
    "Negocio 3",
    "Negocio 4"
  ]

  negocios = [
    {id: 1,nombre: "Negocio 1"},
    {id: 2,nombre: "Negocio 2"},
    {id: 3,nombre: "Negocio 3"}
  ]

  constructor(
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController
  ) {
    this.registroForm = this.formBuilder.group({
      nombre: new FormControl('',Validators.compose([
        Validators.required
      ])),
      apepate: new FormControl('',Validators.compose([
        Validators.required
      ])),
      apemate: new FormControl('',Validators.compose([
        Validators.required
      ])),
      genero: new FormControl('',Validators.compose([
        Validators.required
      ])),
      puesto: new FormControl('',Validators.compose([
        Validators.required
      ])),
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.([a-zA-Z]{2,4})+$')
      ])),
      celular: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      negocio: new FormControl('',Validators.compose([
        Validators.required
      ])),
      callen: new FormControl('',Validators.compose([
        Validators.required
      ])),
      colonia: new FormControl('',Validators.compose([
        Validators.required
      ])),
      municipio: new FormControl('',Validators.compose([
        Validators.required
      ])),
      estado: new FormControl('',Validators.compose([
        Validators.required
      ])),
      cpostal: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[0-9]+$')
      ])),
      telefono: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      tipnego: new FormControl('',Validators.compose([
        Validators.required
      ])),
      password: new FormControl('',Validators.compose([
        Validators.required
      ]))
    })
  }

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  async presentAlert(errores: string,) {
    const alert = await this.alertController.create({
      header: 'Rhino PV',
      // subHeader: 'Problemas al iniciar la sesion',
      cssClass: 'login-alert',
      message: errores,
      buttons: ['OK']
    });

    
    await alert.present();
  }

  ngOnInit() {
  }

  onSubmitRegistro(){
    console.log(this.registroForm.value.nombre);
    console.log(this.registroForm.value.apepate);
    console.log(this.registroForm.value.apemate);
    console.log(this.registroForm.value.genero);
    console.log(this.registroForm.value.puesto);
    console.log(this.registroForm.value.email);
    console.log(this.registroForm.value.celular);
    console.log(this.registroForm.value.negocio);
    console.log(this.registroForm.value.callen);
    console.log(this.registroForm.value.colonia);
    console.log(this.registroForm.value.municipio);
    console.log(this.registroForm.value.estado);
    console.log(this.registroForm.value.cpostal);
    console.log(this.registroForm.value.telefono);
    console.log(this.registroForm.value.tipnego);
    console.log(this.registroForm.value.password);

    this.auth.register(
      this.registroForm.value.nombre,
      this.registroForm.value.apepate,
      this.registroForm.value.apemate,
      this.registroForm.value.genero,
      this.registroForm.value.puesto,
      this.registroForm.value.email,
      this.registroForm.value.celular,
      this.registroForm.value.negocio,
      this.registroForm.value.callen,
      this.registroForm.value.colonia,
      this.registroForm.value.municipio,
      this.registroForm.value.estado,
      this.registroForm.value.cpostal,
      this.registroForm.value.telefono,
      this.registroForm.value.tipnego,
      this.registroForm.value.email,
      this.registroForm.value.password
    ).then( auth =>{
      this.router.navigate(["login"])
      console.log(auth)
      // this.auth.logout();
      this.presentToast("Usuario generado");
      this.presentToast("Bienvenido: " + this.registroForm.value.nombre);
    }).catch (err => {

      console.log(err.code);

      switch (err.code){
        case 'auth/email-already-in-use': {
          this.presentAlert("Usuario existente, favor de escribir uno nuevo");
          break;
        }
        case 'auth/weak-password': {
          this.presentAlert("Contraseña incorrecta, debe contener más de 6 caracteres");
          break;
        }
        case 'auth/invalid-email': {
          this.presentAlert("E-mail incorrecto, intente de nuevo");
          break;
        }
        default: {
          this.presentAlert("Hay un problema con el servicio, validar con soporte técnico " + err.code);
          break;
        }
      }

     });
  }
}
