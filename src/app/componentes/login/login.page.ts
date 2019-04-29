import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email:string;
  public password:string;
  mensaje:string;


  constructor(private authService:AuthService,public router: Router,
              public toastController: ToastController,
              public alertController: AlertController,
              private menuCtrl: MenuController) {
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
      cssClass: "login-alert",
      message: errores,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  onSubmitLogin(){
    this.authService.login(this.email,this.password).then(res => {
      // console.log("contenido " + this.authService.UserId);
      
      this.email="";
      this.password="";
      this.router.navigate(['/home']);

      // this.presentToast("Bienvenido: " + this.registroForm.value.nombre);
  
      }).catch(err => {
        
        console.log(err.code)

        switch (err.code){
          case 'auth/user-disabled': {
            this.presentAlert("El usuario no se encuentra activo");
            break;
          }
          case 'auth/user-not-found': {
            this.presentAlert("E-mail incorrecto, intente de nuevo");
            break;
          }
          case 'auth/wrong-password': {
            this.presentAlert("Password incorrecto, intente de nuevo");
            break;
          }
          case 'auth/invalid-email': {
            this.presentAlert("El correo introducido es incorrecto, intente de nuevo");
            break;
          }
          default: {
            this.presentAlert("Hay un problema con el servicio, validar con soporte técnico " + err.code);
            break;
          }
        }
      });
           
    }    

    onRecupera(){
      this.email="";
      this.password="";
      this.router.navigate(['/recuperar']);
    }
    
    onRegistra(){
      this.email="";
      this.password="";
      this.router.navigate(['/registro']);
    }
}
