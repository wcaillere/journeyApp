import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, icon, LatLngExpression } from 'leaflet';
import {LocationsService, Location} from "../../services/locations.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  public map!: Map;
  locationList: Location[] = [];

  constructor(private locationSrv: LocationsService) {

  }

  ngOnInit() {
    this.locationSrv.locationListChanged.subscribe(
      (response: any) => {
        this.locationList = response;

        //Initialisation de la map
        this.map = new Map('mapView');
        this.leafLetInit();
      }
    )
    this.locationSrv.loadLocations();
  }

  leafLetInit() {
    this.map.setView([45, 2], 5);

    const markerIcon = icon({
      iconUrl: 'assets/icon/locationIcon.webp',
      iconSize: [20, 30]
    });

    console.log(this.locationList)
    for (let location of this.locationList) {
      const locationMarker = marker([location.localisation.lat, location.localisation.long], {
        icon: markerIcon
      })

      // Création du contenu de la Popup
      const div = document.createElement("div");
      div.innerHTML = `<p>${location.name}</p>`;
      const button = document.createElement("ion-button");
      button.innerHTML = "Notes";
      button.setAttribute("size", "small");
      button.setAttribute("href", "/tabs/home");
      div.appendChild(button);

      locationMarker.bindPopup(div)
      locationMarker.addTo(this.map);
    }

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on('click', (event) => console.log(event));

  }
}
