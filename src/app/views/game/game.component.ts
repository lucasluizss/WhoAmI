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
  public player: string;
  private items: Array<string>;
  private counter = 0;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    (window as any).addEventListener('devicemotion', this.handleMotionEvent, true);

    if ((window as any).DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.handleOrientation);
    } else {
      this.notificate('DeviceOrientationEvent is not supported');
    }

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
      this.player = name || 'Anonymous';
      this.notificate(`Lets play ${name}`);

      this.play(this.categoryItem);
    });
  }

  public play(categoryItem): void {
    this.items = categoryItem.data || [];

    this.maxProgress = this.counter = this.settings.numberOfWords;

    this.again = false;

    if (this.settings.playWithTime) {
      this.showItemsWithTime(this.items);
    } else {
      this.showItems();
    }
  }

  private showItems(): void {
    this.item = this.getItem(this.items);

    this.currentProgress++;

    this.items = this.items.filter(i => i !== this.item);
  }

  private showItemsWithTime(items: Array<string>): void {
    if (!items.length || !this.counter) {
      this.again = true;
      this.item = 'TEMPO ESGOTADO!';
      this.computeResult();
      return;
    }

    setTimeout(() => {
      this.item = this.getItem(items);

      this.currentProgress++;
      this.counter--;

      this.showItemsWithTime(items.filter(i => i !== this.item));
    }, +this.settings.time || 2000);
  }

  private getItem(items: Array<string>): string {
    return items[Math.floor(Math.random() * items.length)];
  }

  public rightAnswer(): void {
    this.notificate('Acertou!', 1);
    this.score++;
  }

  public incorrectAnswer(): void {
    this.notificate('Errou!', 1);

    if (this.score > 0) {
      this.score--;
    }
  }

  private computeResult(): void {
    UIkit.modal.prompt('Score:', '').then(score => {
      this.score = +score;

      this.saveScoreResult();
    });
  }

  private saveScoreResult() {
    const result = { name: this.player, score: this.score };
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const index = ranking.findIndex(r => r.name === result.name);

    if (index > -1) {
      ranking[index] = result;
    } else {
      ranking.push(result);
    }

    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  private checkSettings(): void {
    this.settings = JSON.parse(localStorage.getItem('settings'));
  }

  private notificate(message, timeout = 3): void {
    UIkit.notification({
      message,
      status: 'primary',
      pos: 'bottom-center',
      timeout: timeout * 1000
    });
  }

  public handleOrientation(event): void {
    let absolute = event.absolute;
    let alpha = event.alpha;
    let beta = event.beta;
    let gamma = event.gamma;

    this.notificate(`Absolute: ${absolute}`, 10);
    this.notificate(`Alpha: ${alpha}`, 10);
    this.notificate(`Beta: ${beta}`, 10);
    this.notificate(`Gamma: ${gamma}`, 10);
    // Do stuff with the new orientation data
  }

  handleMotionEvent(event) {

    let x = event.accelerationIncludingGravity.x;
    let y = event.accelerationIncludingGravity.y;
    let z = event.accelerationIncludingGravity.z;
    this.notificate(`${x}`);
    this.notificate(`${y}`);
    this.notificate(`${z}`);
    // Do something awesome.
  }

  public onClick(e): void {
    const clickTarget = e.target;
    const clickTargetWidth = clickTarget.offsetWidth;
    const xCoordInClickTarget = e.clientX - clickTarget.getBoundingClientRect().left;

    if (this.counter > 0) {
      this.showItems();
      this.counter--;
    } else {
      this.again = true;
      this.item = 'FIM!';
      this.saveScoreResult();
      return;
    }

    if (clickTargetWidth / 2 > xCoordInClickTarget) {
      this.incorrectAnswer();
    } else {
      this.rightAnswer();
    }
  }
}
