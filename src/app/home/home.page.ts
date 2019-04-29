import { Component, OnInit } from '@angular/core';
import { AuthService } from "../servicios/auth.service";
import { TodoService } from "../servicios/todo.service";
import { ModalController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public chat: any;
  public room: any;
  public UserId: null;

  constructor(public authservice : AuthService, public todoService: TodoService,
              private modal: ModalController, private route: ActivatedRoute,
              private menuCtrl: MenuController){}

  Onlogout(){
    this.authservice.logout();
  }

  onSearch(event){
    console.log(event.target.value);
  }

  ngOnInit(){
    // this.todoService.getTodo().subscribe( todo =>{
    //   todo.map( datos =>{
    //     console.log(datos.payload.doc.data())
    //   })
    // })
    
    this.todoService.getUno(this.authservice.UserId).subscribe(todo =>{
      console.log(todo)  
    })
    console.log("Hola " + this.authservice.UserId);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }


}
