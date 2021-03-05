import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import database from '@data/database.json';
import { Category } from '@models/category.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

	public categories: Category[];

	constructor(private router: Router) { }

	ngOnInit() {
		this.loadCategory();
	}

	loadCategory(): void {
		this.categories = database.categories as Category[];
		localStorage.setItem('categories', JSON.stringify(database.categories));
	}

	goUrl(url: string, id: number): void {
		this.router.navigate([url], { queryParams: { id } });
	}
}
