import { Component, signal } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HandwriteComponent } from '../components/handwrite/handwrite.component';
import { KeepAwake } from '@capacitor-community/keep-awake';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, HandwriteComponent],
})
export class HomePage {
  constructor(){
    this.setFullScreen();
  }

  setFullScreen() {
    try {
      // Configurar la barra de estado para que se superponga sobre la vista web
      StatusBar.setOverlaysWebView({ overlay: true });
  
      // Cambiar el estilo de la barra de estado (opcional, depende de tu diseño)
      StatusBar.setStyle({ style: Style.Light }); // Alternativamente: Style.Light
  
      // Ocultar la barra de estado
      StatusBar.hide();
    } catch (err) {
      console.error('Error setting full screen:', err);
    }
  }

  keepAwake = async () => {
    await KeepAwake.keepAwake();
  };

  allowSleep = async () => {
    await KeepAwake.allowSleep();
  };

  isSupported = async () => {
    const result = await KeepAwake.isSupported();
    return result.isSupported;
  };

  isKeptAwake = async () => {
    const result = await KeepAwake.isKeptAwake();
    return result.isKeptAwake;
  };

  soported = signal<string>("TEST");

  ngOnInit(): void {
    this.soported.set("Cargando...");
    this.isSupported().then((isSupported) => {
      this.soported.set(isSupported ? "Soportado" : "No soportado");
      console.log("isSupported", isSupported);
      if (isSupported) {
        this.keepAwake().then(() => {
          console.log("KeepAwake");
        });
      } else {
        console.log("KeepAwake not supported");
      }
    })
    .catch((error) => {
      this.soported.set("Error");
      console.error(error);
    });
  }

  ngOnDestroy(): void {
    this.isKeptAwake().then((isKeptAwake) => {
      console.log("isKeptAwake", isKeptAwake);
      if (isKeptAwake) {
        this.allowSleep().then(() => {
          console.log("AllowSleep");
        });
      } else {
        console.log("AllowSleep not supported");
      }
    });
  }
}
