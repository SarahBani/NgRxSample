import { Injectable } from '@angular/core';
import { AlertState } from '../models/Enums';

//declare var jquery: any;
declare var $: any;

@Injectable({ providedIn: 'root' })
export class ModalService {

  private currentModalAlertState: AlertState;

  constructor() {
  }

  public showError(message: string): void {
    this.setClasses(AlertState.Danger);
    this.showModalAlert(message, 'Error!');
  }

  private setClasses(alertState: AlertState): void {
    if (this.currentModalAlertState !== undefined) {
      if (this.currentModalAlertState === alertState) {
        return;
      }
      this.resetClasses();
    }
    this.currentModalAlertState = alertState;
    this.addClasses();
  }

  private resetClasses(): void {
    var state: string = AlertState[this.currentModalAlertState].toLowerCase();
    $('#myModalAlert .alert').removeClass('alert-' + state);
  }

  private addClasses(): void {
    var state: string = AlertState[this.currentModalAlertState].toLowerCase();
    $('#myModalAlert .alert').addClass('alert-' + state);
  }

  private showModalAlert(message: string, caption: string): void {
    $('#myModalAlert').modal();                   // initialized with defaults
    $('#myModalAlert').modal({ keyboard: false });   // initialized with no keyboard
    var captionHTML: string = '';
    if (caption != '') {
      captionHTML = '<strong id="caption">' + caption + '</strong> ';
    }
    $('#myModalAlert .modal-alert-content').html(captionHTML + message);
    $('#myModalAlert').modal('show');
  }

}
