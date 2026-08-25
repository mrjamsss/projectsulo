import { Component, input, output } from '@angular/core';
import { AdminOnDuty } from '../../models/solo.models';
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
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonFooter
} from '@ionic/angular';

@Component({
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.scss'],
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
    IonChip,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonFooter
  ],
})
export class UserDetailModalComponent {
  readonly user = input<AdminOnDuty | null>(null);
  readonly isOpen = input<boolean>(false);

  readonly closeModal = output<void>();
  readonly toggleStatus = output<number>();

  onClose(): void {
    this.closeModal.emit();
  }

  onToggleDuty(): void {
    const currentUser = this.user();
    if (currentUser) {
      this.toggleStatus.emit(currentUser.id);
    }
  }
}
