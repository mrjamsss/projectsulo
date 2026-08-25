import { Component, input, output } from '@angular/core';
import { ApplicationRecord } from '../../models/solo.models';
import {
  IonItem,
  IonAvatar,
  IonLabel,
  IonText,
  IonNote,
  IonIcon,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular';

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.scss'],
  imports: [
    IonItem,
    IonAvatar,
    IonLabel,
    IonText,
    IonNote,
    IonIcon,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol
  ],
})
export class ApplicationCardComponent {
  readonly application = input.required<ApplicationRecord>();
  readonly selected = output<ApplicationRecord>();

  onSelect(): void {
    this.selected.emit(this.application());
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'NEW':
        return 'tertiary';
      case 'FOR INTERVIEW':
        return 'primary';
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'danger';
      default:
        return 'medium';
    }
  }
}
