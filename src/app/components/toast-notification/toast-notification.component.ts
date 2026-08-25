import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmarkCircle, alertCircle, informationCircle, warning, close } from 'ionicons/icons';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss'],
  imports: [CommonModule, IonIcon]
})
export class ToastNotificationComponent {
  readonly toastService = inject(ToastService);
  readonly toast = this.toastService.currentToast;

  constructor() {
    addIcons({
      checkmarkCircle,
      alertCircle,
      informationCircle,
      warning,
      close
    });
  }

  getIconName(type: string): string {
    switch (type) {
      case 'success': return 'checkmark-circle';
      case 'error': return 'alert-circle';
      case 'warning': return 'warning';
      case 'info': default: return 'information-circle';
    }
  }

  onClose(): void {
    this.toastService.dismiss();
  }
}
