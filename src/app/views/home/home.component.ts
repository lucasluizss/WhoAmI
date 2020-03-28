import { Component, OnInit } from '@angular/core';
import database from '../../../data/database.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public categories: any;

  constructor() { }

  ngOnInit() {
    this.categories = database.categories;
  }

}
