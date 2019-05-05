import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from "@ionic/angular";

@Component({
  selector: 'app-detapro',
  templateUrl: './detapro.component.html',
  styleUrls: ['./detapro.component.scss'],
})
export class DetaproComponent implements OnInit {

  public marca: string;

  constructor(private modal: ModalController,
              private navparams: NavParams) { }

  ngOnInit() {

    this.marca = this.navparams.get("marca");

  }

  closeChat() {
    this.modal.dismiss()
  }

  onSubmit(){
    console.log("Este es el chingon")
  }

}
