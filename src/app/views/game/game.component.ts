import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var UIkit: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {

  private settings: any;

  public score = 0;
  public item = '';

  public maxProgress = 0;
  public currentProgress = 0;

  public categoryItem: any;

  public again: boolean;

  public player = 'Anonymous';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.checkSettings();

    this.activatedRoute.queryParams.subscribe(params => {
      const categoryId = +params.id;
      const categories = JSON.parse(localStorage.getItem('categories'));
      this.categoryItem = categories.find(x => x.id === categoryId);
    });

    this.whoIsPlaying();
  }

  private whoIsPlaying(): void {
    UIkit.modal.prompt('Name:', '').then((name) => {
      this.player = name;
      this.notificate(`Lets play ${name}`);

      this.play(this.categoryItem);
    });
  }

  public play(categoryItem): void {
    const items = categoryItem.data || [];

    this.maxProgress = items.length;

    this.again = false;

    if (this.settings.playwithtime) {
      this.showItemsWithTime(items);
    } else {
      this.notificate('Not Implemented', 10000);
    }
  }

  private showItemsWithTime(items: Array<string>): void {
    if (!items.length) {
      this.again = true;
      this.item = 'TEMPO ESGOTADO!';
      this.computeResult();
      return;
    }

    setTimeout(() => {
      this.item = this.getItem(items);
      this.currentProgress++;
      this.showItemsWithTime(items.filter(i => i !== this.item));
    }, +this.settings.time || 2000);
  }

  private getItem(items: Array<string>): string {
    return items[Math.floor(Math.random() * items.length)];
  }

  public rightAnswer(): void {
    this.score++;
  }

  public incorrectAnswer(): void {
    if (this.score > 0) {
      this.score--;
    }
  }

  private computeResult(): void {
    UIkit.modal.prompt('Score:', '').then(score => {
      this.score = +score;

      const result = { name: this.player, score: this.score };

      const ranking = JSON.parse(localStorage.getItem('ranking')) || [];

      const index = ranking.findIndex(r => r.name === result.name);

      if (index > -1) {
        ranking[index] = result;
      } else {
        ranking.push(result);
      }

      localStorage.setItem('ranking', JSON.stringify(ranking));
    });
  }

  private checkSettings(): void {
    this.settings = JSON.parse(localStorage.getItem('settings'));
  }

  private notificate(message, timeout = 3000): void {
    UIkit.notification({
      message,
      status: 'primary',
      pos: 'bottom-center',
      timeout
    });
  }
}
