import { Component, OnInit } from '@angular/core';
import database from '../../../data/database.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public categories: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.categories = database.categories;

    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  goUrl(url: string, id: number): void {
    this.router.navigate([url], { queryParams: { id } });
  }

}
