import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from "../app/servicios/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Tablero',
      url: '/home',
      icon: '/assets/imagenes/dashboard.png'
    },
    {
      title: 'Caja',
      url: '/list',
      icon: '/assets/imagenes/pos.png'
    },
    {
      title: 'Inventario',
      url: '/list',
      icon: '/assets/imagenes/stock.png'
    },
    {
      title: 'Producto',
      url: '/list',
      icon: '/assets/imagenes/products.png'
    },
    {
      title: 'Cliente',
      url: '/list',
      icon: '/assets/imagenes/customers.png'
    },
    {
      title: 'Facturación',
      url: '/list',
      icon: '/assets/imagenes/factura.png'
    },
    {
      title: 'Servicios',
      url: '/list',
      icon: '/assets/imagenes/services.png'
    },
    {
      title: 'Configuración',
      url: '/list',
      icon: '/assets/imagenes/settings.png'
    },
    {
      title: 'Ayuda',
      url: '/list',
      icon: '/assets/imagenes/help.png'
    },
    {
      title: 'Nuevo',
      url: '/list',
      icon: '/assets/imagenes/help.png'
    }
  ];

  public salir = [
    {
      title: 'Salir',
      icon: 'exit'
    }
  ];




  public UserId: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.UserId = this.authService.UserId;
    console.log("Prueba:" + this.UserId);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  Onlogout(){
    this.authService.logout();
  }
}
