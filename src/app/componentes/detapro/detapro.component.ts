import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from "@ionic/angular";

@Component({
  selector: 'app-detapro',
  templateUrl: './detapro.component.html',
  styleUrls: ['./detapro.component.scss'],
})
export class DetaproComponent implements OnInit {

  constructor(private modal: ModalController,) { }

  ngOnInit() {}

  closeChat() {
    this.modal.dismiss()
  }
}
