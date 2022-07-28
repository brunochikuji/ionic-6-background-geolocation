import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BackgroundGeolocationLocationProvider } from '@awesome-cordova-plugins/background-geolocation/ngx';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationEvents,
  BackgroundGeolocationResponse,
} from '@awesome-cordova-plugins/background-geolocation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
    private httpClient: HttpClient,
  ) {}

  ngOnInit(): void {
  }

  configurar() {
    const config: BackgroundGeolocationConfig = {
      locationProvider: BackgroundGeolocationLocationProvider.RAW_PROVIDER,
      desiredAccuracy: 10,
      stationaryRadius: 1,
      distanceFilter: 1,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: true, // enable this to clear background location settings when the app terminates,
      startForeground: true,
      interval: 5000,
      fastestInterval: 5000,
      activitiesInterval: 5000,
      notificationTitle: 'atualizado',
    };
    this.backgroundGeolocation.configure(config).then(() => {
      this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
        console.log('Veio, aqui você pode fazer a chamada http ou chamar outros metodos!', location);
        console.log('Importante, só vai ter uma chamada nesse evento se a localização do usuário mudar!');
      });
    });
  }

  stop() {
    this.backgroundGeolocation.stop();
  }


  start() {
    this.backgroundGeolocation.start();
  }

}
