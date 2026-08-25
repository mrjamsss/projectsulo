import { Component, input, output } from '@angular/core';
import { ApplicationRecord } from '../../models/solo.models';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonAvatar,
  IonText,
  IonNote,
  IonLabel,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonFooter
} from '@ionic/angular';

@Component({
  selector: 'app-application-detail-modal',
  templateUrl: './application-detail-modal.component.html',
  styleUrls: ['./application-detail-modal.component.scss'],
  imports: [
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonAvatar,
    IonText,
    IonNote,
    IonLabel,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonFooter
  ],
})
export class ApplicationDetailModalComponent {
  readonly application = input<ApplicationRecord | null>(null);
  readonly isOpen = input<boolean>(false);

  readonly closeModal = output<void>();

  onClose(): void {
    this.closeModal.emit();
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
