import { Component, OnInit } from '@angular/core';
import {Place, LocationsService} from "../../services/locations.service";
import {AlertController, ModalController} from "@ionic/angular";

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent  implements OnInit {

  location!: Place;

  isModalOpen = true;

  constructor(private modalCtrl: ModalController, public locationServ: LocationsService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.locationServ.getNotesOfOneLocation(this.location);
  }

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async showDeleteConfirm(location: Place){
    let alert = await this.alertCtrl.create({
      header: "Voulez-vous vraiment supprimer ce lieu ?",
      subHeader: "Attention : toute note associée sera également suprrimée",
      buttons: [
        {
          text: "Annuler",
          role: 'cancel'
        },
        {
          text: "Confirmer",
          handler: () => {
            this.locationServ.deleteLocation(location)
          }
        }
      ]
    })
    alert.present();
  }

}
