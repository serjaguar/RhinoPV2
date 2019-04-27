import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  email:string;

  constructor(private authService:AuthService,public router: Router,
    public toastController: ToastController,
    public alertController: AlertController) { }


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
      message: errores,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
  }

  onSubmitReset(){

    this.authService.recuperaContra(this.email).then(res => {
      console.log("contenido " + res);
      
      this.router.navigate(['/login']);
  
      }).catch(err => {
        
        console.log(err.code);

        switch (err.code){
          case 'auth/invalid-email': {
            this.presentAlert("El formato del correo no es correcto.");
            break;
          }
          case 'auth/user-not-found': {
            this.presentAlert("El usuario no esta dado de alta en el sistema");
            break;
          }
          default: {
            this.presentAlert("Hay un problema con el servicio, validar con soporte técnico " + err.code);
            break;
          }
        }

        // this.presentToast("Usuario / Contraseña incorrecta" + err.code);
          
      });
           
    }    

}
