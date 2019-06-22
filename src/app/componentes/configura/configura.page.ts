import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configura',
  templateUrl: './configura.page.html',
  styleUrls: ['./configura.page.scss'],
})
export class ConfiguraPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSearch(event){
    console.log(event.target.value);
  }


}
