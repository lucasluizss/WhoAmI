import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {

  private time = 2000;

  public score = 0;
  public item = '';

  public maxProgress = 0;
  public currentProgress = 0;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const categoryId = +params.id;

      const categories = JSON.parse(localStorage.getItem('categories'));

      this.play(categories.find(x => x.id === categoryId));
    });
  }

  play(categoryItem) {
    const items = categoryItem.data || [];

    this.maxProgress = items.length;

    this.showItems(items);
  }

  private showItems(items: Array<string>) {
    if (!items.length) {
      this.item = 'TEMPO ESGOTADO!';
      return;
    }

    setTimeout(() => {
      const randomItem = items[Math.floor(Math.random() * items.length)];

      this.item = randomItem;

      this.currentProgress++;
      this.showItems(items.filter(i => i !== randomItem));
    }, this.time);
  }

  rightAnswer() {
    this.score++;
  }

  incorrectAnswer() {
    if (this.score > 0) {
      this.score--;
    }
  }
}
