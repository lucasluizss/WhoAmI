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
    playwithtime: [''],
    numberofwords: [5],
    time: [2000]
  });

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.settings = JSON.parse(localStorage.getItem('settings'));

    this.updateForm();
  }

  private updateForm() {
    this.settingsForm.setValue({
      playwithtime: this.settings.playwithtime,
      numberofwords: this.settings.numberofwords,
      time: this.settings.time
    });
  }

  public get secounds(): number {
    return Math.round((this.settings.time / 1000) * 100) / 100;
  }

  public onChangeForm(): void {
    const changes = this.settingsForm.value;

    this.settings.time = +changes.time;
    this.settings.playwithtime = changes.playwithtime;
    this.settings.numberofwords = +changes.numberofwords;

    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  public resetSettings(): void {
    this.settings = database.configuration;
    this.updateForm();
    this.notificate('As configurações foram redefinidas!');
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
