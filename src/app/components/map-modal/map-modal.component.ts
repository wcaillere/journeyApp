import { Component, OnInit } from '@angular/core';
import {Location, LocationsService} from "../../services/locations.service";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent  implements OnInit {

  location!: Location;

  isModalOpen = true;

  constructor(private modalCtrl: ModalController, public locationServ: LocationsService) { }

  ngOnInit() {
    this.locationServ.getNotesOfOneLocation(this.location);
  }

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
