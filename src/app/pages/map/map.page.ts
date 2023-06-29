import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, icon, LatLngExpression } from 'leaflet';
import {LocationsService, Place} from "../../services/locations.service";
import {AlertController, ModalController} from "@ionic/angular";
import {MapModalComponent} from "../../components/map-modal/map-modal.component";

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  public map!: Map;
  locationList: Place[] = [];

  constructor(private locationSrv: LocationsService, private modalController: ModalController) {

  }

  ngOnInit() {
    this.map = new Map('mapView');
    this.locationSrv.locationListChanged.subscribe(
      (response: any) => {
        this.locationList = response;
        this.leafLetInit();
      }
    )
    this.locationSrv.loadLocations();
  }

  async showMarkerDialog(location: Place){
    const modal =await this.modalController.create({
      component: MapModalComponent,
      componentProps: {
        location: location
      },
    });
    return modal.present();
  }

  leafLetInit() {
    this.map.setView([45, 2], 4);

    const markerIcon = icon({
      iconUrl: 'assets/icon/locationIcon.webp',
      iconSize: [20, 30]
    });

    for (let location of this.locationList) {
      const locationMarker = marker([location.localisation.lat, location.localisation.long], {
        icon: markerIcon
      })
      locationMarker.on('click', () => {
        this.showMarkerDialog(location);
      })
      locationMarker.addTo(this.map);
    }

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on('click', (event) => console.log(event));

  }
}
