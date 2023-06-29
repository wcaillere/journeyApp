import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Map, icon, marker, tileLayer, Marker, layerGroup} from "leaflet";
import {LocationsService, Place} from "../../services/locations.service";
import {ToastController} from "@ionic/angular";

export interface PlaceInput {
  name: string;
  localisation: {
    lat: number | null,
    long: number | null,
  }

}

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.page.html',
  styleUrls: ['./new-location.page.scss'],
})
export class NewLocationPage implements OnInit {

  map!: Map;
  newPlace: PlaceInput = {
    name: "",
    localisation: {
      lat: null,
      long: null
    }
  }

  constructor(private _location: Location, private locationSrv: LocationsService) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.map = new Map('newLocationMap');
    this.leafLetInit();
  }

  leafLetInit() {
    this.map.setView([45, 2], 4);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    var markersGroup = layerGroup();
    this.map.addLayer(markersGroup);

    this.map.on('click', (event) => {
      markersGroup.clearLayers();

      const markerIcon = icon({
        iconUrl: 'assets/icon/locationIcon.webp',
        iconSize: [20, 30],
        iconAnchor: [10, 30]
      });

      const newMarker = marker(event.latlng, {
        icon: markerIcon
      });
      newMarker.addTo(markersGroup);
      this.newPlace.localisation.lat = event.latlng.lat;
      this.newPlace.localisation.long = event.latlng.lng;
    });

  }

  saveNewLocation(){
      let newLocation: Place = new Place();
      newLocation.name = this.newPlace.name;
      newLocation.localisation = this.newPlace.localisation;
      this.locationSrv.saveLocation(newLocation);
  }

  goback() {
    this._location.back();
  }

  isValid() {
    return !(this.newPlace.name === "" || this.newPlace.name === null || this.newPlace.localisation.lat === null || this.newPlace.localisation.long === null);
  }

}
