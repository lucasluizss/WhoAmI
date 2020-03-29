import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  public settings: any;

  public settingsForm = this.fb.group({
    playwithtime: [true],
    time: [2000]
  });

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.settings = JSON.parse(localStorage.getItem('settings'));
  }

  public get secounds(): number {
    return Math.round((this.settings.time / 1000) * 100) / 100;
  }

  public onChangeForm(): void {
    const changes = this.settingsForm.value;

    this.settings.time = +changes.time;
    this.settings.playwithtime = changes.playwithtime === 'true';

    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

}
