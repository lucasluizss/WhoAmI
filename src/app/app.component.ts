import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'WhoAmI';

  constructor() {
    // Detecta se o dispositivo está no iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test( userAgent );
    };

    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator);
    // Verifica se deve exibir notificação popup de instalação:
    if (isIos() && !isInStandaloneMode()) {
      alert('Add to home screen');
    }
  }
}
