import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemUser } from '../../models/solo.models';
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
import { addIcons } from 'ionicons';
import {
  closeOutline,
  mailOutline,
  locationOutline,
  shieldCheckmarkOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  pauseOutline,
  playOutline,
  personOutline,
  ribbonOutline,
  keyOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-view-account-modal',
  templateUrl: './view-account-modal.component.html',
  styleUrls: ['./view-account-modal.component.scss'],
  imports: [
    CommonModule,
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
export class ViewAccountModalComponent {
  /** The system user to display */
  readonly user = input<SystemUser | null>(null);

  /** Whether the modal dialog is open */
  readonly isOpen = input<boolean>(false);

  /** Event emitted when closing the modal */
  readonly closeModal = output<void>();

  /** Event emitted when toggling the user active/inactive status */
  readonly toggleStatus = output<number>();

  constructor() {
    addIcons({
      closeOutline,
      mailOutline,
      locationOutline,
      shieldCheckmarkOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      pauseOutline,
      playOutline,
      personOutline,
      ribbonOutline,
      keyOutline
    });
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onToggleStatus(): void {
    const currentUser = this.user();
    if (currentUser) {
      this.toggleStatus.emit(currentUser.id);
    }
  }

  getRoleColor(role: string): string {
    switch (role) {
      case 'SUPERADMIN':
        return 'danger';
      case 'ADMIN':
        return 'primary';
      case 'SOLO PARENT':
        return 'tertiary';
      default:
        return 'medium';
    }
  }

  getRoleDescription(role: string): string {
    switch (role) {
      case 'SUPERADMIN':
        return 'Full system authority, user provisioning, database auditing & federation oversight.';
      case 'ADMIN':
        return 'Manages solo parent applications, schedules interviews, and verifies records.';
      case 'SOLO PARENT':
        return 'Beneficiary account with access to assistance applications, status tracking & announcements.';
      default:
        return 'Standard system access.';
    }
  }
}
