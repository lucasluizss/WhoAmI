import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import database from '../../../data/database.json';
declare var UIkit: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  public settings: any;

  public settingsForm = this.fb.group({
    playWithTime: [true],
    numberOfWords: [5],
    timePerWord: [2000],
    playingTime: [30000]
  });

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.settings = JSON.parse(localStorage.getItem('settings'));

    this.updateForm();
  }

  private updateForm() {
    this.settingsForm.setValue({
      playWithTime: this.settings.playWithTime,
      numberOfWords: this.settings.numberOfWords,
      timePerWord: this.settings.timePerWord,
      playingTime: this.settings.playingTime
    });
  }

  public get secoundsPerWord(): number {
    return Math.round((this.settings.timePerWord / 1000) * 100) / 100;
  }

  public get secoundsOfGame(): number {
    return Math.round((this.settings.playingTime / 1000) * 100) / 100;
  }

  public onChangeForm(): void {
    const changes = this.settingsForm.value;

    this.settings.playingTime = +changes.playingTime;
    this.settings.timePerWord = +changes.timePerWord;
    this.settings.playWithTime = changes.playWithTime;
    this.settings.numberOfWords = +changes.numberOfWords;

    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  public resetSettings(): void {
    this.settings = database.configuration;
    this.updateForm();
    this.notificate('As configuracoes foram redefinidas!');
  }

  public resetRanking(): void {
    localStorage.removeItem('ranking');
    this.notificate('Ranking foi redefinido!');
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
