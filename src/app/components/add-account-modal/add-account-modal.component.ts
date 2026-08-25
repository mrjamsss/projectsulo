import { Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonIcon,
  IonText,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  ToastController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  personAddOutline,
  closeOutline,
  eyeOutline,
  eyeOffOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import { SoloService } from '../../services/solo.service';
import { ToastService } from '../../services/toast.service';
import { SystemUser, UserRole } from '../../models/solo.models';

export interface AddAccountFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  position: string;
  barangay: string;
}

@Component({
  selector: 'app-add-account-modal',
  templateUrl: './add-account-modal.component.html',
  styleUrls: ['./add-account-modal.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonIcon,
    IonText,
    IonNote,
    IonSelect,
    IonSelectOption,
    IonSpinner
  ],
})
export class AddAccountModalComponent {
  
  readonly dismissed = output<void>();
  
  readonly accountCreated = output<SystemUser>();

  private soloService = inject(SoloService);
  private toastService = inject(ToastService);

  // Form fields (Bound via [(ngModel)])
  fullName = '';
  email = '';
  password = '';
  phone = '';
  role: UserRole = 'SOLO PARENT';
  position = 'Solo Parent Applicant';
  barangay = '';

  
  readonly showPassword = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);

  
  readonly errors = signal<Partial<Record<keyof AddAccountFormData, string>>>({});

  constructor() {
    addIcons({
      personAddOutline,
      closeOutline,
      eyeOutline,
      eyeOffOutline,
      checkmarkCircleOutline
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  onRoleChange(event: CustomEvent): void {
    const selectedRole = event.detail.value as UserRole;
    this.role = selectedRole;
    
    if (selectedRole === 'SOLO PARENT') {
      this.position = 'Solo Parent Applicant';
    } else if (selectedRole === 'ADMIN') {
      this.position = 'LGU Social Welfare Officer';
    } else if (selectedRole === 'SUPERADMIN') {
      this.position = 'Federation Head';
    }
  }

  dismiss(): void {
    this.dismissed.emit();
  }

  private validate(): boolean {
    const errs: Partial<Record<keyof AddAccountFormData, string>> = {};

    if (!this.fullName.trim()) errs.name = 'Full name is required.';
    if (!this.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errs.email = 'Enter a valid email address.';
    }
    if (!this.password.trim()) {
      errs.password = 'Password is required.';
    } else if (this.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    if (!this.role) errs.role = 'Account role is required.';

    this.errors.set(errs);
    return Object.keys(errs).length === 0;
  }

  async onSubmit(): Promise<void> {
    if (!this.validate()) return;

    this.isSubmitting.set(true);

    // Simulate async save (would be an API call in a real app)
    await new Promise(resolve => setTimeout(resolve, 700));

    const newUser: SystemUser = {
      id: Date.now(),
      name: this.fullName.trim(),
      email: this.email.trim(),
      barangay: this.barangay.trim() || 'N/A',
      role: this.role,
      status: 'ACTIVE',
      avatarChar: this.fullName.trim().charAt(0).toUpperCase()
    };

    this.soloService.addSystemUser(newUser);
    this.isSubmitting.set(false);
    this.accountCreated.emit(newUser);

    this.toastService.success(
      `Account for ${newUser.name} created successfully!`,
      'Account Created'
    );
  }
}
